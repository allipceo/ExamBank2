import pandas as pd

def update_ibex_id(file_path):
    """
    마스터 엑셀 파일의 'IBEX_ID'를 '세부과목'에 맞게 수정합니다.
    """
    # 과목 코드 매핑 정의
    subject_map = {
        '보험업법': 'S01', '상법': 'S02', '세제재무': 'S03', '위험관리': 'S04',
        '자동차보험': 'S05', '특종보험': 'S06', '보증보험': 'S07', '연금저축': 'S08',
        '화재보험': 'S09', '해상보험': 'S10', '항공우주': 'S11', '재보험': 'S12'
    }

    try:
        df = pd.read_excel(file_path)
        print(f"'{file_path}' 파일을 성공적으로 읽었습니다. 수정을 시작합니다...")
        
        # 'IBEX_ID' 업데이트
        for index, row in df.iterrows():
            subject = row['세부과목']
            if subject in subject_map:
                correct_code = subject_map[subject]
                
                ibex_id_parts = str(row['IBEX_ID']).split('_')
                if len(ibex_id_parts) == 6:
                    # 다섯 번째 요소가 실제 과목 코드와 다를 경우에만 업데이트
                    if ibex_id_parts[4] != correct_code:
                        ibex_id_parts[4] = correct_code
                        df.at[index, 'IBEX_ID'] = '_'.join(ibex_id_parts)
                else:
                    print(f"  - 경고: {index}번 행의 IBEX_ID '{row['IBEX_ID']}' 형식이 올바르지 않습니다.")
            else:
                print(f"  - 경고: {index}번 행의 세부과목 '{subject}'를 매핑할 수 없습니다.")

        # 수정된 데이터프레임을 원본 파일에 덮어쓰기
        df.to_excel(file_path, index=False)
        print("IBEX_ID 업데이트가 완료되어 파일을 저장했습니다.")

    except FileNotFoundError:
        print(f"오류: 파일 '{file_path}'을 찾을 수 없습니다.")
    except Exception as e:
        print(f"파일 처리 중 오류 발생: {e}")

if __name__ == '__main__':
    master_file_path = 'data/ExamBank_Master_Data_V4.5.xlsx'
    update_ibex_id(master_file_path) 