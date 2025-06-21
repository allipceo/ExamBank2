import pandas as pd
import json
import argparse
import os

def extract_data(exam_round, num_questions=10):
    """
    Excel 마스터 데이터 파일에서 특정 회차의 문제 데이터를 추출하여 JSON 파일로 저장합니다.
    """
    try:
        # --- 1. 파일 경로 설정 ---
        # 이 스크립트 파일의 위치를 기준으로 상대 경로를 계산합니다.
        script_dir = os.path.dirname(__file__)
        project_root = os.path.abspath(os.path.join(script_dir, '..'))
        
        excel_file_path = os.path.join(project_root, 'data', 'ExamBank_Master_Data_V4.0.xlsx')
        output_dir = os.path.join(project_root, 'data')
        output_filename = f'simple-data-{exam_round}-{num_questions}.json'
        output_filepath = os.path.join(output_dir, output_filename)

        print(f"프로젝트 루트: {project_root}")
        print(f"엑셀 파일 경로: {excel_file_path}")
        print(f"출력 JSON 파일 경로: {output_filepath}")

        # --- 2. 데이터 추출 ---
        # 엑셀 파일 읽기 (openpyxl 엔진 필요)
        df = pd.read_excel(excel_file_path, engine='openpyxl')
        
        # IBEX_ID에서 회차 정보 추출 (예: 'IBEX_23_001_...' -> 23)
        df['회차'] = df['IBEX_ID'].apply(lambda x: int(x.split('_')[1]))
        
        # 해당 회차의 데이터만 필터링
        target_df = df[df['회차'] == exam_round].head(num_questions)
        
        if target_df.empty:
            print(f"오류: {exam_round}회차에 해당하는 데이터를 찾을 수 없습니다.")
            return

        # --- 3. JSON 구조로 변환 (23회차 포맷 기준) ---
        # "23회와 같은 포멧으로 진행" 지시에 따라 구조를 완전히 일치시킴
        questions_data = []
        for index, (df_index, row) in enumerate(target_df.iterrows(), 1):
            questions_data.append({
                "id": index, # 1부터 시작하는 숫자 ID
                "ibexId": row['IBEX_ID'],
                "fullText": row['문제+보기'],  # '문제+보기' 원본 데이터가 있는 컬럼
                "answer": int(row['정답']) # 정수형으로 변환하여 저장
                # 'answer_text' 필드는 23회 기준에 없으므로 제외
            })
            
        # --- 4. JSON 파일로 저장 ---
        # 최상위가 {"questions": [...]} 인 객체 구조로 저장
        output_data = {"questions": questions_data}
        with open(output_filepath, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, ensure_ascii=False, indent=4)
            
        print(f"성공: {output_filename} 파일이 'data' 폴더에 생성되었습니다. ({len(questions_data)}개 문제) - 23회 포맷 적용 완료")

    except FileNotFoundError:
        print(f"오류: 엑셀 파일을 찾을 수 없습니다. 경로를 확인하세요: {excel_file_path}")
    except Exception as e:
        print(f"오류 발생: {e}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="보험중개사 시험 데이터 추출 스크립트")
    parser.add_argument('--round', type=int, required=True, help="추출할 시험 회차 (예: 24)")
    args = parser.parse_args()
    
    extract_data(args.round) 