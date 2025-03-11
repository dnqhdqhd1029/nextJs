var contentType = 'C'

function makeImageStyleInEditor(html) {
  const containerElement = document.createElement('div')
  const originEditorElement = document.querySelector('.ck.ck-content')
  containerElement.innerHTML = html

  document.querySelector('#editor-html').append(containerElement)

  const captionStyles = `
    background-color: #f7f7f7;
    color: #333;
    padding: 6px 0;
    word-break: break-word;
    text-align: center;
    margin: 5px 0 0;
    font-size: 14px;
    font-family: 'Malgun Gothic'
  `

  const figureElements = containerElement.querySelectorAll('figure.image')

  // 이미지 처리
  for (let figureElementIndex = 0; figureElementIndex < figureElements.length; figureElementIndex++) {
    const figureElement = figureElements[figureElementIndex]
    const figureElementClassNames = figureElement.getAttribute('class')
    const divElement = document.createElement('div')
    const tableElement = document.createElement('table')
    const originFigureElement = figureElement.cloneNode(true)
    const imageElement = figureElement.querySelector('img')
    const oldCaptionElement = figureElement.querySelector('figcaption')
    const captionElement = document.createElement('div')
    const blinkLineElement = document.createElement('table')

    // 줄 바꿈을 위한 빈 테이블 추가
    blinkLineElement.setAttribute('cellspacing', '0')
    blinkLineElement.setAttribute('cellpadding', '0')
    blinkLineElement.setAttribute('border', '0')
    blinkLineElement.setAttribute('align', 'center')
    blinkLineElement.setAttribute('width', '100%')
    blinkLineElement.innerHTML = `
      <tr>
        <td style='width: 100%; height: 1px; padding: 0; margin: 0; border: 0;'></td>
      </tr>
    `

    divElement.setAttribute('style', 'width: 100%; margin:0; padding:0; overflow: hidden; clear:both;')
    divElement.append(tableElement)
    divElement.append(blinkLineElement)
    tableElement.setAttribute('cellspacing', '0')
    tableElement.setAttribute('cellpadding', '0')
    tableElement.setAttribute('border', '0')
    tableElement.setAttribute('align', 'center')
    tableElement.innerHTML = `
    <tr>
      <td class='row-num-0' style='width: 100%; height: 100%; padding: 0;'></td>
    </tr>
    `
    // tableElement.innerHTML = `
    // <tr>
    //   <td class='row-num-0' style='width: 100%; height: 100%; padding: 0; text-align: center; vertical-align: middle;'></td>
    // </tr>
    // <tr class='row-num-1'>
    //   <td style='width: 100%; height: 100%; padding: 0; text-align: center; vertical-align: middle;'>
    //     <a href='${imageElement.getAttribute(
    //       'src'
    //     )}' target='_blank' style='text-decoration: none; color: #333; display: block;'>이미지 원본 보기</a>
    //   </td>
    // </tr>
    // `

    const figureInnerDiv = document.createElement('div')
    const originImageViewDiv = document.createElement('div')
    figureInnerDiv.style.width = 'fit-content'
    figureInnerDiv.style.textAlign = 'center'
    figureInnerDiv.classList.add('row-num-0-inner-div')

    containerElement.insertBefore(divElement, figureElement)

    originImageViewDiv.innerHTML = `
      <a href='${imageElement.getAttribute(
        'src'
      )}' style='text-decoration: none; color: #333;' target='_blank' rel='noopener noreferrer'>이미지 원본 보기</a>
    `

    tableElement.querySelector('.row-num-0').append(figureInnerDiv)
    tableElement.querySelector('.row-num-0-inner-div').append(figureElement)
    if(!figureElement.classList.contains('none-origin')){
      tableElement.querySelector('.row-num-0-inner-div').append(originImageViewDiv)
    }

    let figureWidth = originFigureElement ? originFigureElement.getAttribute('style') : '0'
    let figureHeight = ''

    if (!!figureWidth) {
      const figureWidthNumber = parseInt(figureWidth.replace(/\D/g, ''))

      if (figureWidthNumber <= 200) {
        figureWidth = '200'
      } else if (figureWidthNumber > 200 && figureWidthNumber <= 400) {
        figureWidth = '400'
      } else {
        figureWidth = '600'
      }
    } else {
      figureWidth = imageElement.getAttribute('width')
      figureHeight = imageElement.getAttribute('height')
    }

    imageElement.setAttribute('width', figureWidth)
    imageElement.setAttribute('height', 'auto')
    originImageViewDiv.classList.add('row-num-1')
    // originImageViewDiv.style.width = `${figureWidth}px`
    originImageViewDiv.style.textAlign = 'center'

    if(figureElementClassNames.indexOf('align-left') !== -1){
      tableElement.querySelector('.row-num-0').style.textAlign = '-webkit-left'
      tableElement.setAttribute('align', 'left')
      divElement.setAttribute('align', 'left')
    } else if(figureElementClassNames.indexOf('align-right') !== -1){
      tableElement.querySelector('.row-num-0').style.textAlign = '-webkit-right'
      tableElement.setAttribute('align', 'right')
      divElement.setAttribute('align', 'right')
    } else {
      tableElement.querySelector('.row-num-0').style.textAlign = '-webkit-center'
      tableElement.setAttribute('align', 'center')
      divElement.setAttribute('align', 'center')
    }

    if (oldCaptionElement) {
      // 캡션 처리
      captionElement.setAttribute('style', `${captionStyles};width:${figureWidth}px;`)
      captionElement.append(oldCaptionElement)
      // oldCaptionElement.remove()
      // tableElement.querySelector('.row-num-0-inner-div').append(captionElement)
      figureElement.append(captionElement)
    }
  }

  // p 태그 안에 이미지 처리
  const imageElements = containerElement.querySelectorAll('p img')

  for(const imageElement of imageElements){
    const objectExistingInlineStyle = getStyledObject(imageElement)
    if(!!objectExistingInlineStyle['width']){
      imageElement.setAttribute('width', objectExistingInlineStyle['width'].replace(/\D/g, ''))
      imageElement.setAttribute('height', 'auto')
    }
  }

  // 번호형목록 들여쓰기 inline 스타일로 교체
  var ol_1 = containerElement.querySelectorAll('ol');
  for(const element of ol_1){
    let listStyle = 'decimal'
    const liElements = element.childNodes
    for(const li of liElements){
      li.setAttribute('style', `list-style: ${listStyle}`)
    }
    element.setAttribute('style', `list-style: ${listStyle}`)
  }
  var ol_2 = containerElement.querySelectorAll('ol ol');
  for(const element of ol_2){
    let listStyle = 'lower-alpha'
    const liElements = element.childNodes
    for(const li of liElements){
      li.setAttribute('style', `list-style: ${listStyle}`)
    }
    element.setAttribute('style', `list-style: ${listStyle}`)
  }
  var ol_3 = containerElement.querySelectorAll('ol ol ol');
  for(const element of ol_3){
    let listStyle = 'lower-roman'
    const liElements = element.childNodes
    for(const li of liElements){
      li.setAttribute('style', `list-style: ${listStyle}`)
    }
    element.setAttribute('style', `list-style: ${listStyle}`)
  }
  var ol_4 = containerElement.querySelectorAll('ol ol ol ol');
  for(const element of ol_4){
    let listStyle = 'upper-alpha'
    const liElements = element.childNodes
    for(const li of liElements){
      li.setAttribute('style', `list-style: ${listStyle}`)
    }
    element.setAttribute('style', `list-style: ${listStyle}`)
  }
  var ol_5 = containerElement.querySelectorAll('ol ol ol ol ol');
  for(const element of ol_5){
    let listStyle = 'upper-roman'
    const liElements = element.childNodes
    for(const li of liElements){
      li.setAttribute('style', `list-style: ${listStyle}`)
    }
    element.setAttribute('style', `list-style: ${listStyle}`)
  }

  // 불릿 목록 inline 교체
  var ul_1 = containerElement.querySelectorAll('ul');
  for(const element of ul_1){
    let listStyle = 'disc'
    const liElements = element.childNodes
    for(const li of liElements){
      li.setAttribute('style', `list-style: ${listStyle}`)
    }
    element.setAttribute('style', `list-style: ${listStyle}`)
  }
  var ul_2 = containerElement.querySelectorAll('ul ul');
  for(const element of ul_2){
    let listStyle = 'circle'
    const liElements = element.childNodes
    for(const li of liElements){
      li.setAttribute('style', `list-style: ${listStyle}`)
    }
    element.setAttribute('style', `list-style: ${listStyle}`)
  }
  var ul_3 = containerElement.querySelectorAll('ul ul ul');
  for(const element of ul_3){
    let listStyle = 'square'
    const liElements = element.childNodes
    for(const li of liElements){
      li.setAttribute('style', `list-style: ${listStyle}`)
    }
    element.setAttribute('style', `list-style: ${listStyle}`)
  }

  // 국문 폰트 따옴표 & 맑은고딕 두종류 전부 삽입
  var spanElements = containerElement.querySelectorAll('span')
  for(const spanElement of spanElements){
    const existingInlineStyle = (spanElement.getAttribute('style') || '')?.trim()
    let objectExistingInlineStyle = {}
    let isGothic = false
    for(const existingValue of existingInlineStyle.split(';')){
      if(!!existingValue.trim()){
        const [k, v] = existingValue.split(':')
        objectExistingInlineStyle[k?.trim()] = v?.trim()
      }
    }

    if(objectExistingInlineStyle['font-family'] === '맑은고딕'){
      objectExistingInlineStyle['font-family'] = "'맑은 고딕'"
      isGothic = true
    } else if(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(objectExistingInlineStyle['font-family'])){
      objectExistingInlineStyle['font-family'] = `'${objectExistingInlineStyle['font-family']}'`
    }

    if(objectExistingInlineStyle['background-color'] === '#ffe74c'){
      delete objectExistingInlineStyle['background-color']
    }

    spanElement.setAttribute('style', `${Object.entries(objectExistingInlineStyle).map(([key, value]) => `${key}: ${value}`).join(';')};${isGothic ? "font-family:'맑은고딕';font-family: 'Malgun Gothic'" : ''}`)
  }

  return `
  <!DOCTYPE html>
  <html lang="ko">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
    ${containerElement.innerHTML}
    </body>
  </html>
  `
}

function getRemovedSomeHTML(html) {
  const divElement = document.createElement('div')
  divElement.innerHTML = html
  
  // 이미지 링크 제거
  do {
    if(divElement.querySelector('.row-num-1')){
      divElement.querySelector('.row-num-1').remove()
    } else {
      break;
    }
  } while (true);

  const figcaptions = divElement.querySelectorAll('figcaption')

  for(const figcaption of figcaptions){
    const parent = figcaption.parentNode
    const tagName = parent.tagName
    if(tagName === 'DIV'){
      const figureElement = parent.parentNode
      const newFigcaption = figcaption.cloneNode(true)
      figureElement.append(newFigcaption)
      parent.remove()
    }
  }

  return divElement.innerHTML
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function dataURLtoBlob (dataURL){
  const [header, data] = dataURL.split(',');
  const mimeString = header.split(':')[1].split(';')[0];
  const binaryString = atob(data);
  const arrayBuffer = new ArrayBuffer(binaryString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: mimeString });
};

function blobToFile (blob, filename) {
  return new File([blob], filename, { type: blob.type });
};

function getYouTubeVideoId(url) {
  const youtubeRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
  const match = url.match(youtubeRegex);
  return match ? match[1] : null;
}

async function getThumbnailImagesSynthesis (imgUrl) {
  const playBtnImgUrl = "/assets/png/play_btn_68.png";
  const img1 = new Image();
  const img2 = new Image();

  img1.crossOrigin = "anonymous";
  img2.crossOrigin = "anonymous";

  img1.src = window.location.origin.startsWith('https://local.svc.d.mediabee.kr')
    ? `https://local.svc.d.mediabee.kr:4189/api/proxy?url=${imgUrl}` // local
    : `https://svc.d.mediabee.kr/api/proxy?url=${imgUrl}`; // dev
  // img1.src = `https://local.svc.d.mediabee.kr:4189/api/proxy?url=${imgUrl}`; // local
  img2.src = playBtnImgUrl;

  return await Promise.all([
    new Promise((resolve) => (img1.onload = resolve)),
    new Promise((resolve) => (img2.onload = resolve)),
  ]).then(async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img1.width;
    canvas.height = img1.height;

    const image2Width = 68;
    const image2Height = 68;
    const x = (canvas.width - image2Width) / 2;
    const y = (canvas.height - image2Height) / 2;

    ctx.drawImage(img1, 0, 0);
    ctx.drawImage(img2, x, y);

    // 캔버스의 데이터를 이미지 URL로 변환합니다.
    const imgData = canvas.toDataURL("image/png");
    const blob = dataURLtoBlob(imgData)
    const file = blobToFile(blob, `thumbnail_${getYouTubeVideoId(imgUrl)}.png`)

    const formData = new FormData();
    formData.append("attachment", file);

    const accessToken = getCookie(btoa('X-accessToken-Svc'));

    try{
      // const response = await fetch('http://localhost:8089/v1/svc/image/upload', {
      const response = await fetch('https://svcapi.d.mediabee.kr/v1/svc/image/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      })
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
  
      const result = await response.json()
  
      return result;
    } catch (error) {
      throw new Error(error)
    }
  });
};

function positionToSet(position) {
  const model = editor.model;
  const viewDocument = editor.editing.view.document;
  const modelDocument = model.document;

  model.change((writer) => {
    const root = modelDocument.getRoot();
    // console.log('root : ', root)
    const childCount = root.childCount;
    // console.log('childCount : ', childCount)
    const positionToSet = model.createPositionFromPath(root, [childCount - position]);

    writer.setSelection(positionToSet);
  });
}

function getStyledObject(element){
  if(element instanceof HTMLElement){
    const existingInlineStyle = (element.getAttribute('style') || '')?.trim()
    let objectExistingInlineStyle = {}
    for(const existingValue of existingInlineStyle.split(';')){
      if(!!existingValue.trim()){
        const [k, v] = existingValue.split(':')
        objectExistingInlineStyle[k?.trim()] = v?.trim()
      }
    }

    return objectExistingInlineStyle
  } else {
    return {}
  }
}

function getStyledExists(element, existsStyleName) {
  if(element instanceof HTMLElement){
    objectExistingInlineStyle = getStyledObject(element)
    return !!objectExistingInlineStyle[existsStyleName]
  }
}

function getCursorPosition(editor) {
  const selection = editor.model.document.selection;
  const position = selection.getFirstPosition();
  const viewSelection = editor.editing.view.document.selection;

  return {
      modelPosition: position,
      viewSelection: viewSelection
  };
};

async function setDataWithCursorPreservation(editor, data) {
  // 저장된 커서 위치
  let savedSelection = null;

  // 데이터 설정 전에 커서 위치 저장
  editor.model.change(writer => {
    savedSelection = writer.createSelection(
      editor.model.document.selection.getFirstPosition()
    );
  });

  // 비동기 데이터 설정
  await editor.setData(data);

  // 데이터 설정 후 커서 위치 복원
  editor.model.change(writer => {
    writer.setSelection(savedSelection);
  });
}
var cursorPosition = null;

function setCursorPosition(editor) {
  const selection = editor.model.document.selection;
  console.log(selection.getFirstPosition())
  // cursorPosition = selection.getFirstPosition();
}


async function getElementRange(root, position) {
  let node;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, false);
  let index = 0
  const cursorLine = position.path[0]
  const cursorCol = position.path[1]

  while ((node = walker.nextNode())) {
    const { tagName } = node
    if(['P', 'FIGURE', 'LI', 'HR'].includes(tagName)){
      const nodeText = node.textContent || '';
      const textLength = nodeText.length
      // p 태그인 경우
      if(tagName === 'P'){
        // const childSpan = node.querySelectorAll('span')
        // let isSpan = false
        // 아래 스판이 있는 경우와 없는 경우
        // for(const spanElement of childSpan){
        //   isSpan = true
        // }

        // console.log(nodeText)
        // console.log(textLength)
        // length === 1이면서 !!!nodeText.trim() => p태그를 figure 태그로 교체
        // length > 1 이상이면서 !!!nodeText.trim() => p태그 끝에 image 태그 추가
        
        // cursor가 0이면서 text가 없는 경우
        // cursorCol === 0 && textLength === 0        
        // cursor가 0이면서 text가 있는 경우
        // return {
        //   node
        // }
      } else if(tagName === 'HR'){
        // 선 태그 뒤쪽에 바로 삽입
        // return {
        //   node
        // }
      } else if(tagName === 'FIGURE'){
        // figure 태그인 경우
      } else if(tagName === 'LI'){
        // ol, ul 태그인 경우
        if(index === cursorLine){
          return {
            node: node.parentNode // ul
          }
        }
      }

      if (nodeText.length >= cursorCol && index === cursorLine) {
        return {
          node
        };
      }

      index++
    }
  }
  return null;
};

try {

  // 이미지 서버 URL 설정
  window.__MEDIABEE__IMAGE_SERVER_URL = 'https://svcapi.d.mediabee.kr/v1/svc/image/upload'
  // window.__MEDIABEE__IMAGE_SERVER_URL = 'http://localhost:8089/v1/svc/image/upload'
  window.__MEDIABEE__ACCESS_TOKEN_NAME = btoa('X-accessToken-Svc')

  window.addEventListener(
    'load',
    function () {

      Object.defineProperty(window, '__CKEDITOR_UPLOAD_ERROR__', {
        get() {
          return __CKEDITOR_UPLOAD_ERROR__;
        },
        set(value) {
          window.parent.postMessage({ uploadError: value }, '*');
        }
      });

      if (editor.state === 'ready') {
        editor.model.document.on('change', () => {
          // setCursorPosition(editor)
          // const selection = editor.model.document.selection;
          // const position = selection.getFirstPosition();
          // console.log(position)
          // cursorPosition = position

          window.parent.postMessage({ cursorPosition: JSON.stringify({ ...getCursorPosition(editor).modelPosition }) }, '*')
        });

        editor.model.document.on('change:data', () => {
          setTimeout(async () => {
            const editorContent = editor.getData()

            if(!!!editorContent){
              editor.execute('fontFamily', { value: "맑은고딕" })
              editor.execute('fontSize', { value: "14px" })
            }

            let isMediaChange = false
            let isReplaceChange = false

            const containerElement = document.createElement("div");
            containerElement.innerHTML = editorContent;

            /* add media archives S */
            const archivesElements = containerElement.querySelectorAll("figure.archives");

            if(!!archivesElements.length){
              if(!!cursorPosition){
                // console.log(containerElement)
                for(let i = archivesElements.length - 1; i >= 0; i--){
                  const archivesElement = archivesElements[i]
                  const newArchivesElement = archivesElement.cloneNode(true)
                  const newContentRange = await getElementRange(containerElement, cursorPosition);
                  if(!!newContentRange){
                    newArchivesElement.classList.remove('archives')
                    newContentRange.node.insertAdjacentElement('afterend', newArchivesElement)
                    archivesElement.remove()
                  }
                  else {
                    newArchivesElement.classList.remove('archives')
                    containerElement.append(newArchivesElement)
                    archivesElement.remove()
                  }
                }
              } else {
                for(const archivesElement of archivesElements){
                  const newArchivesElement = archivesElement.cloneNode(true)
                  newArchivesElement.classList.remove('archives')
                  containerElement.append(newArchivesElement)
                  archivesElement.remove()
                }
              }
              isReplaceChange = true
            }
            /* add media archives E */

            /* media -> image change S */
            /* replaceTagList */
            const patterns = ['{이름}', '{소속}', '{직책}'];

            const mediaElements = containerElement.querySelectorAll("figure.media");
            for (const mediaElement of mediaElements) {
              const mediaUrl = mediaElement
                .querySelector("oembed")
                .getAttribute("url");
              const youtubeId = getYouTubeVideoId(mediaUrl?.split("?")[0]);
              const thumbnailImgUrl = `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
              let imgUrl = '';
              // let cursorPosition = null;

              // const selection = editor.model.document.selection;
              // cursorPosition = selection.getFirstPosition();

              const result = await getThumbnailImagesSynthesis(thumbnailImgUrl)

              if(result.status === 'S'){
                const figureElement = document.createElement("figure");
                const imgElement = document.createElement("img");
                const linkElement = document.createElement("a");

                figureElement.classList.add("image", "none-origin");
                figureElement.style.marginBottom = "0";
                imgElement.src = result.data;
                imgElement.width = "320";
                imgElement.height = "180";
                imgElement.setAttribute("style", "aspect-ratio:320/180;");

                linkElement.href = mediaUrl;

                linkElement.append(imgElement);
                figureElement.append(linkElement);
                containerElement.insertBefore(figureElement, mediaElement)
                mediaElement.remove();

                isMediaChange = true;
              } else {
                this.alert('파일 업로드에 실패했습니다.')
              }
            }
            /* media -> image change E */

            /* replace tag background S */
            let isReplaceTag = false

            isReplaceTag = new RegExp(patterns.join('|'), 'g').test(containerElement.innerText)

            if(isReplaceTag){
              const pElements = containerElement.querySelectorAll('p')

              for(const pElement of pElements){
                const isElementReplaceTag = new RegExp(patterns.join('|'), 'g').test(pElement.innerText)
                if(isElementReplaceTag){
                  let isReplaceYet = false;

                  const walker = document.createTreeWalker(
                    pElement,
                    NodeFilter.SHOW_TEXT,
                    null,
                    false
                  );

                  // replace 필요 여부 판단
                  while (walker.nextNode()) {
                    const node = walker.currentNode;
                    const parent = node.parentNode;
                    const nodeText = node.textContent;
                    // B, I, A
                    if (parent.tagName === "P") {
                      isReplaceYet = true;
                      break;
                    } else if (parent.tagName === "SPAN") {
                      const regex = new RegExp(patterns.join("|"), "g");
                      let arrText = [];
                      let lastIndex = 0;
                      let match;
                      while ((match = regex.exec(nodeText)) !== null) {
                        nodeText.substring(lastIndex, match.index) !== "" &&
                          arrText.push(
                            nodeText.substring(lastIndex, match.index)
                          );
                        arrText.push(match[0]);
                        lastIndex = regex.lastIndex;
                      }
                      nodeText.substring(lastIndex) !== "" &&
                        arrText.push(nodeText.substring(lastIndex));
  
                      if (
                        (arrText.length === 1 &&
                        !!new RegExp(patterns.join("|"), "g").exec(arrText[0]) &&
                        !getStyledExists(parent, "background-color")) || arrText.length > 1
                      ) {
                        isReplaceYet = true;
                        break;
                      }
                    } else if(['B', 'I'].includes(parent.tagName)) {
                      // B, I
                      const spanElement = parent.closest('span')

                      if(!!!spanElement){
                        isReplaceYet = true;
                        break;
                      }

                      const regex = new RegExp(patterns.join("|"), "g");
                      let arrText = [];
                      let lastIndex = 0;
                      let match;
                      while ((match = regex.exec(nodeText)) !== null) {
                        nodeText.substring(lastIndex, match.index) !== "" &&
                          arrText.push(
                            nodeText.substring(lastIndex, match.index)
                          );
                        arrText.push(match[0]);
                        lastIndex = regex.lastIndex;
                      }
                      nodeText.substring(lastIndex) !== "" &&
                      arrText.push(nodeText.substring(lastIndex));

                      if (
                        (arrText.length === 1 &&
                        !!new RegExp(patterns.join("|"), "g").exec(arrText[0]) &&
                        !getStyledExists(spanElement, "background-color")) || arrText.length > 1
                      ) {
                        isReplaceYet = true;
                        break;
                      }
                    }
                  }

                  if (isReplaceYet) {
                    const text = pElement.innerText;
                    const imageElements = pElement.querySelectorAll('img')
                    const children = pElement.childNodes;

                    const regex = new RegExp(patterns.join("|"), "g");
                    let result = "";
                    let lastIndex = 0;
                    let match = "";
  
                    while ((match = regex.exec(text)) !== null) {
                      text.substring(lastIndex, match.index) !== "" &&
                        (result += `<span style="font-family:맑은고딕;font-size:14px;">${text.substring(
                          lastIndex,
                          match.index
                        )}</span>`);
                      result += `<span style="font-family:맑은고딕;font-size:14px;background-color: #ffe74c;">${match[0]}</span>`;
                      lastIndex = regex.lastIndex;
                    }
  
                    text.substring(lastIndex) !== "" &&
                      (result += `<span style="font-family:맑은고딕;font-size:14px;">${text.substring(
                        lastIndex
                      )}</span>`);
  
                    pElement.innerHTML = result;
                    isReplaceChange = true;

                    // Array.from(children).forEach((child, childIndex) => {
                    //   console.log(child)
                    //   if(child.nodeType === Node.TEXT_NODE){
                        
                    //   } else {
                    //     // image 태그인경우 result에 추가
                    //     // 나머지 태그들인 경우 기존 태그들 밖으로 span으로 감싸주기
                    //     // b, i 태그는 span이 밖으로, a 태그는 b, i span이 안으로
                    //     // span tag일 경우는 안에 텍스트 구분해서 치환태그 변환 로직
                    //   }
                    // })
                  }
                }
              }
            }

            // li 태그 안에 있는 match를 잡아주자

            const highlightElements = containerElement.querySelectorAll('span')

            for(const highlightElement of highlightElements){
              const objectExistingInlineStyle = getStyledObject(highlightElement)
              if(getStyledExists(highlightElement, 'background-color') && objectExistingInlineStyle['background-color'] === '#ffe74c' && !new RegExp(patterns.join('|'), 'g').test(highlightElement.innerText)){
                highlightElement.setAttribute('style', `${Object.entries(objectExistingInlineStyle).filter(([key, value]) => key !== 'background-color').map(([key, value]) => `${key}: ${value}`).join(';')}`)
                isReplaceChange = true
              }
            }
            /* replace tag background E */

            /* figcaption default font setting S */
            const figcaptions = containerElement.querySelectorAll('figcaption')
            for(const figcaption of figcaptions){
              const walker = document.createTreeWalker(
                figcaption,
                NodeFilter.SHOW_TEXT,
                null,
                false
              );

              while (walker.nextNode()) {
                const node = walker.currentNode;
                const parent = node.parentNode;
                const spanText = node.textContent;
                if(parent.tagName === 'FIGCAPTION'){
                  figcaption.innerHTML = `<span style="font-family:맑은고딕;font-size:14px;">${spanText}</span>`

                  isReplaceChange = true
                }
              }
            }
            /* figcaption default font setting E */

            isMediaChange && editor.setData(containerElement.innerHTML)
            isReplaceChange && setDataWithCursorPreservation(editor, containerElement.innerHTML)

            const contentHtml = makeImageStyleInEditor(editorContent)

            // setCursorPosition(editor)
            if(contentType === 'E'){
              window.parent.postMessage({ emailContent: contentHtml, cursorPosition: JSON.stringify({ ...getCursorPosition(editor).modelPosition }) }, '*')
            } else {
              window.parent.postMessage({ editorContent: contentHtml, cursorPosition: JSON.stringify({ ...getCursorPosition(editor).modelPosition }) }, '*')
            }
          }, 50)
        });
      }

      window.addEventListener('message', function (e) {
        const origin = e.origin || e.originalEvent.origin

        if (origin !== 'https://local.svc.d.mediabee.kr:4189' && origin !== 'https://svc.d.mediabee.kr' && origin !== 'https://local.demo.d.mediabee.kr:4189' && origin !== 'https://demo.d.mediabee.kr') {
          return
        }

        const { setToken, getPreviewContent, content, imageUrl, makeScreenshot, setHeight, currentCursorPosition, type } = e.data

        if (setToken !== undefined) {
          const accessTokenName = btoa('X-accessToken-Svc')
          setCookie(accessTokenName, setToken, 90)
        }

        if (content !== undefined) {
          const removedSpecificHTML = getRemovedSomeHTML(content)
          editor.setData(removedSpecificHTML)
          if(!!currentCursorPosition){
            cursorPosition = JSON.parse(currentCursorPosition)
            // editor.editing.view.focus()
            // setTimeout(() => {
            //   positionToSet(3)
            // }, 200)
          }
        }

        if(!!type){
          contentType = type
        }

        // if (getContent !== undefined) {
        //   const editorContent = editor.getData()
        //   // console.log('>> getContent', editorContent)
        //   const newHtml = makeImageStyleInEditor(editorContent)
        //   window.parent.postMessage({ editorContent: newHtml }, '*')
        // }

        if (getPreviewContent !== undefined) {
          const editorContent = editor.getData()
          // console.log('>> getPreviewContent', editorContent)
          const newHtml = makeImageStyleInEditor(editorContent)
          window.parent.postMessage({ previewContent: newHtml }, '*')
        }

        if (imageUrl !== undefined) {
          editor.execute('insertImage', {
            source: [{ src: imageUrl, alt: 'First alt text' }],
          })
        }

        if (makeScreenshot !== undefined) {
          // html2canvas(document.querySelector('#editor-html')).then(canvas => {
          //   const dataUrl = canvas.toDataURL('image/png')
          //   console.log('>> dataUrl', dataUrl)
          //   window.parent.postMessage({ dataUrl }, '*')
          // })

          html2canvas(document.querySelector('#editor-html'), {
            logging: true,
            letterRendering: 1,
            useCORS: true,
          }).then(canvas => {
            const dataUrl = canvas.toDataURL('image/png')
            window.parent.postMessage({ dataUrl }, '*')
          })
        }
      })
    },
    false
  )
} catch (e) {
  console.log('>> e', e)
}
