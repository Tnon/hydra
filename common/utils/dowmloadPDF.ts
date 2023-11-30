/*
 * @Author: Delevin.TnT
 * @LastEditors: Caocong.dw
 * @Date: 2022-04-20 11:54:47
 * @LastEditTime: 2022-06-10 20:36:45
 */
// 导出页面为PDF格式
import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';
export const getpdf = () => {
  const title = '报告';
  html2Canvas(document.querySelector('#pdfDom')!, {
    allowTaint: true,
    useCORS: true,
  }).then(function (canvas) {
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;
    const pageHeight = (contentWidth / 592.28) * 841.89;
    let leftHeight = contentHeight;
    let position = 0;
    const imgWidth = 595.28;
    const imgHeight = (592.28 / contentWidth) * contentHeight;
    const pageData = canvas.toDataURL('image/png', 1.0);
    const PDF = new JsPDF(undefined, 'pt', 'a4');
    if (leftHeight < pageHeight) {
      PDF.addImage(pageData, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
      while (leftHeight > 0) {
        PDF.addImage(pageData, 'PNG', 0, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89;
        if (leftHeight > 0) {
          PDF.addPage();
        }
      }
    }
    PDF.save(title + '.pdf');
  });
};
