// 전체 서비스 공통 유틸리티 함수
function showMessage(message) {
    alert(message);
}

function goToService(serviceName) {
    window.location.href = '/services/' + serviceName + '/';
}
