import pandas as pd

def analyze_excel_structure(file_path):
    """
    엑셀 파일의 '세부과목'을 정제(공백제거)한 후,
    고유값 목록을 다시 분석하여 출력합니다.
    """
    try:
        df = pd.read_excel(file_path)
        
        # '세부과목' 컬럼의 데이터 타입을 문자열로 변환하고, 앞뒤 공백을 제거합니다.
        cleaned_subjects = df['세부과목'].astype(str).str.strip()
        unique_subjects = cleaned_subjects.unique()
        
        print("===== '세부과목' 컬럼 정제 후 고유값 목록 =====")
        for subject in unique_subjects:
            print(f"- {subject}")
        
    except FileNotFoundError:
        print(f"오류: 파일 '{file_path}'을 찾을 수 없습니다.")
    except Exception as e:
        print(f"파일 분석 중 오류 발생: {e}")

if __name__ == '__main__':
    # 분석할 파일 경로
    master_file_path = 'data/ExamBank_Master_Data_V4.0.xlsx'
    analyze_excel_structure(master_file_path) 