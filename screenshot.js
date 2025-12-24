const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // 고해상도 설정 (2배 스케일)
    await page.setViewport({
        width: 860,
        height: 1200,
        deviceScaleFactor: 2
    });
    
    // HTML 파일 로드
    const htmlPath = path.join(__dirname, 'pressure_test_section.html');
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
    
    // 페이지 전체 높이 계산
    const bodyHandle = await page.$('body');
    const { height } = await bodyHandle.boundingBox();
    
    // 뷰포트 높이 조정
    await page.setViewport({
        width: 860,
        height: Math.ceil(height) + 60,
        deviceScaleFactor: 2
    });
    
    // 고품질 PNG로 저장
    await page.screenshot({
        path: path.join(__dirname, 'pressure_test_result.png'),
        type: 'png',
        fullPage: true
    });
    
    console.log('✅ 이미지 저장 완료: pressure_test_result.png');
    console.log(`   해상도: ${860 * 2} x ${Math.ceil(height + 60) * 2} 픽셀`);
    
    await browser.close();
})();


