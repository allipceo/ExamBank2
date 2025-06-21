class MemoryBank {
    constructor() {
        this.storage = new Map();
    }

    set(key, value) {
        this.storage.set(key, value);
        console.log(`Set: ${key} =`, value);
    }

    get(key) {
        const value = this.storage.get(key);
        console.log(`Get: ${key} ->`, value);
        return value;
    }

    has(key) {
        return this.storage.has(key);
    }

    delete(key) {
        const wasDeleted = this.storage.delete(key);
        if (wasDeleted) {
            console.log(`Deleted: ${key}`);
        } else {
            console.log(`Key not found for deletion: ${key}`);
        }
        return wasDeleted;
    }

    clear() {
        this.storage.clear();
        console.log("MemoryBank cleared.");
    }

    size() {
        return this.storage.size;
    }

    getAll() {
        return Object.fromEntries(this.storage);
    }
}

// Example Usage based on the "마스터플랜"
const projectMemory = new MemoryBank();

console.log("--- 프로젝트 핵심 정보 로딩 ---");

// 1. 프로젝트 상태
projectMemory.set("projectName", "보험중개사 자격시험 지능형 학습 플랫폼");
projectMemory.set("currentPhase", "5단계 완료: 개발 프로세스 자동화 및 안정화");
projectMemory.set("nextMilestone", "전체 회차(20~30회) 확장 및 상용화 준비");
projectMemory.set("projectStatus", "✅ PROJECT COMPLETED SUCCESSFULLY");

// 2. 핵심 철학 및 원칙
projectMemory.set("corePhilosophy", "단순함이 최고다 (Simplicity is the best)");
projectMemory.set("developmentPrinciples", [
    "데이터 중심 설계 (Data-Driven Design)",
    "사용자 중심 사고 (User-Centric Thinking)",
    "검증된 방식 재사용 (Reuse Proven Patterns)",
    "자동화 우선 (Automation First)"
]);

// 3. 팀 구성 및 역할
projectMemory.set("teamRoles", {
    "조대표": "총괄",
    "노팀장": "기획",
    "서대리": "코딩"
});

// 4. 핵심 기술 자산
projectMemory.set("technicalAssets", {
    "masterData": "11년치 1,439개 문제 (ExamBank_Master_Data_V4.0.xlsx)",
    "dataIdSystem": "IBEX ID 체계 (서비스 ID)",
    "automationScript": "extract_data.py",
    "deployment": "GitHub Pages 자동 배포",
    "techStack": "HTML, CSS, JavaScript (Vanilla)"
});

// 5. 정량적 성과
projectMemory.set("keyMetrics", {
    "completedRounds": "4개 회차 (20, 21, 22, 23회)",
    "devSpeed": "회차당 5분 이내",
    "automationRate": "100%",
    "codeSize": "3K 단일 HTML 파일"
});

// 6. 사용자 프로필
projectMemory.set("targetUser", "중장년층 수험생");
projectMemory.set("uxFocus", "직관적 인터페이스, 쉬운 사용성, 큰 글씨, 명확한 색상 대비");

// 7. 개발 워크플로우 (서대리 설명 문서 기반)
projectMemory.set("developmentWorkflow", {
    "summary": "GitHub 프로젝트 보드를 이용한 체계적인 브랜치 기반 개발",
    "components": {
        "GitHub Project": "종합상황실의 작전 지도. (할 일, 진행 중, 완료)",
        "Branch": "임시 작업 구역. (main: 완공 건물, feature/*: 특정 공사 구역)",
        "Workspace": "실제 건설 현장. (D:\\AI_Project\\InsuranceApp)"
    },
    "process": [
        "1. [GitHub Project]에서 '할 일' 카드 확인",
        "2. 해당 작업을 위한 'feature/*' 브랜치 생성",
        "3. [Workspace]에서 실제 코드 개발 및 테스트",
        "4. 개발 완료 후 'main' 브랜치로 병합(merge) 및 브랜치 삭제",
        "5. [GitHub Project]의 카드를 '완료'로 이동"
    ]
});

// 8. [최우선] 20회 연동 실패 분석 및 교훈
projectMemory.set("postmortem_20_fail", {
    summary: "20회 연동 시, 데이터 구조 불일치 및 코드 유연성 부족으로 2시간 이상 배포 지연.",
    rootCause: "검증된 '22/23회 성공 패턴'을 재현하지 않고, 데이터(최상위 배열 누락)와 코드(객체 전용 접근) 구조를 임의로 변경함.",
    keyLesson: "'문제+보기 원본 그대로'와 '성공 패턴 100% 복제' 원칙의 중요성을 재확인함.",
    preventiveActions: [
        "모든 JSON 데이터 구조 및 필드명 표준화 강제",
        "데이터 로딩 함수의 유연성 확보 (배열/객체 모두 지원)",
        "신규 회차 추가 시, 기존 성공 구조와 다를 경우 코드 리뷰에서 반려",
        "단계별(데이터-코드-테스트) 승인 및 체크리스트 운영"
    ]
});

// 9. [최우선] 데이터 표준
projectMemory.set("dataStandards", {
    jsonStructure: "반드시 최상위 레벨이 배열(Array) `[]` 형태여야 함.",
    requiredFields: "id, question, answer, answer_text",
    contentRule: "question 필드에는 문제와 보기가 파싱/분리 없이 원본 그대로 포함되어야 함."
});

// 10. [진행 예정] 3단계 개발 절차 (GitHub 프로젝트 보드 기반)
projectMemory.set("phase_3_plan", {
    summary: "GitHub 프로젝트 보드를 활용한 체계적인 3단계 개발 진행",
    projectBoard: "ExamBank Phase 3",
    columns: ["Backlog", "To Do", "In Progress", "Review", "Done"],
    epics: {
        "Epic 1: 전체 회차 완성": "24회, 25회, 26~30회 순차적 완성 (회차당 5분 목표)",
        "Epic 2: 사용자 경험 고도화": "오답노트, 학습 진도 관리, 통계 대시보드 등"
    },
    immediatePriority: "24회, 25회 연동 실전 테스트를 통해 워크플로우 검증",
    workflowForSeoDaeri: [
        "1. 'To Do'에서 작업 카드 선택 후 본인에게 할당(assign)",
        "2. 카드를 'In Progress'로 이동",
        "3. 해당 작업의 feature 브랜치 생성 후 개발",
        "4. 개발 완료 후 Pull Request(PR) 생성 및 'Review'로 카드 이동",
        "5. 코드 리뷰 및 승인 후 main에 병합, 'Done'으로 카드 이동"
    ]
});

// 11. [최신] Git 동기화 실패 사태 분석 및 최종 해결책 (2025-06-21)
projectMemory.set("postmortem_git_sync_fail", {
    summary: "로컬 main 브랜치와 원격 main 브랜치의 이력이 충돌(diverge)하여, 모든 push/pull 명령이 거부되는 교착 상태 발생.",
    rootCause: [
        "1. 서대리의 'main' 브랜치 직접 수정 시도 및 잦은 Git 명령어 실수.",
        "2. 조대표님의 원격 저장소 직접 수정(README.md 생성)과 서대리의 로컬 변경사항이 충돌.",
        "3. 서대리가 pull, rebase 등 표준적인 해결책을 잘못 적용하여 상황을 더욱 악화시킴."
    ],
    keyLesson: "Git 이력이 복잡하게 꼬였을 때, 어설픈 해결 시도는 상황을 악화시킬 뿐이다. 가장 확실한 방법은 깨끗한 상태에서 다시 시작하는 것이다.",
    finalSolution: {
        author: "조대표",
        procedure: [
            "1. 모든 관련 프로그램(커서, 깃 데스크톱) 종료.",
            "2. 문제가 된 로컬 프로젝트 폴더 완전 삭제.",
            "3. GitHub 원격 저장소에서 'git clone'으로 프로젝트를 새로 다운로드.",
            "4. 깨끗하게 클론된 폴더에서 작업을 재개."
        ],
        principle: "문제가 해결되지 않을 때는, 가장 단순하고 확실한 방법으로 되돌아가라."
    }
});

console.log("\n--- 정보 조회 예시 ---");
projectMemory.get("teamRoles");
console.log("프로젝트 상태:", projectMemory.get("projectStatus"));
console.log("데이터 표준:", projectMemory.get("dataStandards"));

console.log("\n--- [진행 예정] 3단계 개발 계획 조회 ---");
console.log("3단계 개발 계획:", projectMemory.get("phase_3_plan"));

console.log("\n--- 전체 메모리 뱅크 ---");
console.log(projectMemory.getAll());

console.log("\n--- [최우선] 실패 교훈 및 데이터 표준 조회 ---");
console.log("20회 연동 실패 분석:", projectMemory.get("postmortem_20_fail"));
console.log("데이터 표준:", projectMemory.get("dataStandards"));

module.exports = MemoryBank; 