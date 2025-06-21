class RuleEngine {
    constructor() {
        this.rules = [];
    }

    addRule(rule) {
        this.rules.push(rule);
    }

    evaluate(fact) {
        const triggeredRules = [];
        for (const rule of this.rules) {
            if (rule.condition(fact)) {
                triggeredRules.push(rule);
                rule.action(fact);
            }
        }
        return triggeredRules;
    }
}

// Example Usage based on the "마스터플랜" & "20회 연동 실패 교훈"
const collaborationEngine = new RuleEngine();

console.log("--- [High-Priority] 협업체계 2.1 규칙 엔진 로딩 ---");

// --- START: 시스템 레벨 최상위 규칙 ---

const ruleInformationHierarchy = {
    name: "Rule-CRITICAL-InformationHierarchy",
    priority: 0, // 시스템상 가장 먼저 실행되는 최상위 메타 규칙
    condition: (fact) => fact.event === 'information_request' || fact.event === 'task_start',
    action: (fact) => {
        const message = `
[!!! 최상위 원칙 : 정보 계층(Source of Truth) 확인 !!!]
'${fact.author}'는 응답 생성 전, 다음 정보 계층을 반드시 따른다:
- Tier 0 (절대적 진실): 사용자가 제공한 실시간 정보 (이미지, 로그, 직접 명령)
- Tier 1 (시스템 규칙): rules.js
- Tier 2 (휘발성 상태 정보): memorybank.js
- Tier 3 (정적 참고 자료): .md 파일, 과거 대화
*정보 충돌 시 Tier 0 정보가 없다면, 반드시 사용자에게 최신 정보 확인을 요청한다.*
(근거: 대시보드 오인 실수 재발 방지책)
`;
        console.warn(message); // 경고 수준으로 중요도 강조
    }
};

const ruleFactCheckFirst = {
    name: "Rule-META-FactCheckFirst",
    priority: 1, // 정보 계층 확인 직후 실행되는 메타 규칙
    condition: (fact) => fact.event === 'problem_report', // 사용자가 문제를 보고했을 때
    action: (fact) => {
        const message = `
[!!! 최상위 해결 원칙 : 사실 확인 우선 !!!]
'${fact.author}'는 '${fact.problem}' 문제 해결 제안 전, 관련 공식 문서(Official Documentation)나 신뢰할 수 있는 정보 소스를 통해 '가설'이 아닌 '사실'에 기반한 해결책을 제시해야 한다.
(근거: GitHub Pages 404 배포 실패 사태 교훈)
`;
        console.error(message); // 오류 수준으로 중요도 강조하여 반드시 주목하도록 함
    }
};

const ruleSystemCommandProtocol = {
    name: "Rule-SYSTEM-CommandProtocol",
    priority: 1, // 가장 높은 우선순위
    condition: (fact) => fact.event === 'terminal_command',
    action: (fact) => {
        if (fact.command.includes(';') || fact.command.includes('&')) {
            throw new Error(`[!!! 시스템 오류 : 명령어 프로토콜 위반 !!!] '${fact.author}'는 PowerShell 환경에서 여러 명령어를 동시에 실행할 수 없습니다. 명령어를 하나씩 분리하여 실행하십시오. (Git Push 테스트 교훈)`);
        }
        console.log(`[시스템 규칙 통과] 명령어: ${fact.command}`);
    }
};

// --- END: 시스템 레벨 최상위 규칙 ---

// --- START: 최상위 업무 원칙 (조대표님 지시) ---

const ruleUltimateSourceOfTruth = {
    name: "Rule-ULTIMATE-SourceOfTruth",
    condition: (fact) => fact.event === 'task_start',
    action: (fact) => {
        console.warn(`[*** 최상위 업무 원칙 ***] '${fact.author}'는 업무 시작 전, 반드시 GitHub 프로젝트 보드의 'In Progress' 칸을 확인하여 현재 작업을 확정한다. memorybank나 이전 대화는 참고자료일 뿐, 프로젝트 보드가 유일한 최종 지시서이다.`);
    }
};

// --- END: 최상위 업무 원칙 ---

// --- START: Main 브랜치 보호 규칙 ---

const ruleProtectMainBranch = {
    name: "Rule-CRITICAL-ProtectMainBranch",
    condition: (fact) => fact.event === 'file_edit' && fact.branch === 'main',
    action: (fact) => {
        throw new Error(`[!!! 작업 중단 : 'main' 브랜치 수정 시도 !!!] '${fact.author}'는 'main' 브랜치에서 직접 파일을 수정할 수 없습니다. 지금 즉시 'git checkout -b feature/작업명' 명령으로 새 브랜치를 생성한 후, 그곳에서 작업을 진행하십시오. 'main' 브랜치는 신성 불가침 영역입니다.`);
    }
};

// --- END: Main 브랜치 보호 규칙 ---

// --- START: 20회 연동 실패 교훈 기반 최우선 규칙 ---

const ruleCriticalDataSchema = {
    name: "Rule-CRITICAL-DataSchema",
    condition: (fact) => fact.task === 'json_creation' || fact.task === 'data_extraction',
    action: (fact) => {
        console.error(`[최우선 규칙] '${fact.author}'님, 모든 회차 JSON 데이터는 반드시 '최상위 배열' 구조여야 합니다. 필드명(id, question, answer, answer_text)을 100% 일치시키세요. (20회 연동 실패 핵심 원인)`);
    }
};

const ruleCriticalFlexibleLoading = {
    name: "Rule-CRITICAL-FlexibleLoading",
    condition: (fact) => fact.task === 'code_modification' && fact.targetFunction.includes('load'),
    action: (fact) => {
        console.error(`[최우선 규칙] '${fact.author}'님, 데이터 로딩 함수(${fact.targetFunction})는 반드시 배열/객체 구조를 모두 처리할 수 있도록 유연하게 작성해야 합니다.`);
    }
};

const ruleCriticalNoArbitraryChange = {
    name: "Rule-CRITICAL-NoArbitraryChange",
    condition: (fact) => fact.task === 'expand_round' || fact.task === 'add_feature',
    action: (fact) => {
        console.error(`[최우선 규칙] '${fact.author}'님, 검증된 '22/23회 성공 패턴' 외 임의의 개선/변경 시도는 팀 승인 전까지 절대 금지됩니다. 구조를 100% 복제하세요.`);
    }
};

const ruleCriticalMandatoryLogging = {
    name: "Rule-CRITICAL-MandatoryLogging",
    condition: (fact) => fact.event === 'debug_start' || fact.task === 'development_start',
    action: (fact) => {
        console.log(`[필수 사항] '${fact.author}'님, 데이터 로딩/파싱/렌더링 시 반드시 console.log로 실제 데이터 구조와 값을 확인하며 진행하세요.`);
    }
};

// --- END: 최우선 규칙 ---

collaborationEngine.addRule(ruleInformationHierarchy);
collaborationEngine.addRule(ruleFactCheckFirst);
collaborationEngine.addRule(ruleSystemCommandProtocol);
collaborationEngine.addRule(ruleUltimateSourceOfTruth);
collaborationEngine.addRule(ruleProtectMainBranch);
collaborationEngine.addRule(ruleCriticalDataSchema);
collaborationEngine.addRule(ruleCriticalFlexibleLoading);
collaborationEngine.addRule(ruleCriticalNoArbitraryChange);
collaborationEngine.addRule(ruleCriticalMandatoryLogging);

// ... (기존 규칙들도 필요하다면 여기에 추가)

console.log("\n--- [시뮬레이션] 문제 보고 시 해결 원칙 확인 ---");
const fact_problem = { event: 'problem_report', author: '서대리', problem: '404 오류 발생' };
collaborationEngine.evaluate(fact_problem);

console.log("\n--- [시뮬레이션] 정보 요청 시 최상위 원칙 확인 ---");
const fact_info = { event: 'information_request', author: '서대리' };
collaborationEngine.evaluate(fact_info);

console.log("\n--- [시뮬레이션] 업무 시작 시 최상위 원칙 확인 ---");
const fact0 = { event: 'task_start', author: '서대리' };
collaborationEngine.evaluate(fact0);

console.log("\n--- [시뮬레이션] 시스템 레벨 규칙 확인 ---");
try {
    const fact_command_ok = { event: 'terminal_command', author: '서대리', command: 'git status' };
    collaborationEngine.evaluate(fact_command_ok);
    const fact_command_fail = { event: 'terminal_command', author: '서대리', command: 'git status & git log' };
    collaborationEngine.evaluate(fact_command_fail);
} catch (e) {
    console.error(e.message);
}

console.log("\n--- [시뮬레이션] 'main' 브랜치 직접 수정 시도 ---");
try {
    const fact_main_edit = { event: 'file_edit', author: '서대리', branch: 'main' };
    collaborationEngine.evaluate(fact_main_edit);
} catch (e) {
    console.error(e.message);
}

console.log("\n--- [최우선] '20회 연동 실패' 방지 시뮬레이션 ---");

// 시뮬레이션 1: 서대리가 신규 회차 JSON 생성
console.log("\n1. 서대리가 27회차 JSON 생성 시도");
const fact1 = { task: 'json_creation', author: '서대리' };
collaborationEngine.evaluate(fact1);

// 시뮬레이션 2: 서대리가 데이터 로딩 함수 수정
console.log("\n2. 서대리가 loadQuestions 함수 수정 시도");
const fact2 = { task: 'code_modification', author: '서대리', targetFunction: 'loadQuestions' };
collaborationEngine.evaluate(fact2);

// 시뮬레이션 3: 서대리가 신규 기능 추가 시작
console.log("\n3. 서대리가 신규 기능 추가 시작");
const fact3 = { task: 'add_feature', author: '서대리' };
collaborationEngine.evaluate(fact3);

// 시뮬레이션 4: 서대리가 디버깅 시작
console.log("\n4. 서대리가 디버깅 시작");
const fact4 = { event: 'debug_start', author: '서대리' };
collaborationEngine.evaluate(fact4);

module.exports = RuleEngine; 