import pandas as pd
import json
import os

def create_subject_json_files():
    """
    마스터 엑셀 파일에서 각 과목별로, 매 회차당 5개의 문제를 추출하여
    12개의 과목별 JSON 파일을 생성합니다.
    """
    try:
        master_file_path = 'data/ExamBank_Master_Data_V4.0.xlsx'
        master_df = pd.read_excel(master_file_path)
        print(f"'{master_file_path}' 파일을 성공적으로 읽었습니다.")
    except FileNotFoundError:
        print(f"오류: 마스터 데이터 파일 '{master_file_path}'을 찾을 수 없습니다.")
        return

    # 과목 이름과 파일 번호 매핑
    subjects_map = {
        '보험업법': '01', '상법': '02', '세제재무': '03', '위험관리': '04',
        '자동차보험': '05', '특종보험': '06', '보증보험': '07', '연금저축': '08',
        '화재보험': '09', '해상보험': '10', '항공우주': '11', '재보험': '12'
    }

    output_dir = 'data'
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # 각 과목에 대해 작업 반복
    for subject_name, subject_number in subjects_map.items():
        all_problems_for_subject = []
        
        # 20회부터 30회까지 각 회차에 대해 작업 반복
        for round_num in range(20, 31):
            # 현재 과목과 회차에 해당하는 데이터 필터링
            round_subject_df = master_df[
                (master_df['세부과목'] == subject_name) & 
                (master_df['회차'] == round_num)
            ]
            
            # 회차인덱스 순으로 정렬 후 상위 5개 추출
            sorted_df = round_subject_df.sort_values('회차인덱스')
            top_5 = sorted_df.head(5)
            
            for _, row in top_5.iterrows():
                problem = {
                    "id": row['IBEX_ID'],
                    "question": row['문제+보기'],
                    "answer": int(row['정답']),
                    "answer_text": row['키워드']
                }
                all_problems_for_subject.append(problem)
        
        # 과목별 JSON 파일 생성
        output_file = os.path.join(output_dir, f'subject-{subject_number}.json')
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(all_problems_for_subject, f, ensure_ascii=False, indent=2)
        
        print(f"'{output_file}'이 성공적으로 생성되었습니다. (총 {len(all_problems_for_subject)}개 문제)")

if __name__ == '__main__':
    create_subject_json_files() 