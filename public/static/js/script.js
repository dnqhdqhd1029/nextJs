// public/static/js/script.js
function sendHeightToParent() {
  const contentHeight = document.querySelector('#content').clientHeight
  window.parent.postMessage({ height: document.querySelector('#content').clientHeight + 35 }, '*')
}

function checkAllImagesLoaded(parentElement, callback) {
  let images = parentElement.getElementsByTagName('img');
  let totalImages = images.length;
  let loadedImages = 0;

  for(let i = 0; i < totalImages; i++) {
    if(images[i].complete) {
      loadedImages++;
    } else {
      images[i].addEventListener('load', function() {
        loadedImages++;
        if(loadedImages === totalImages) {
          callback();
        }
      });
    }
  }

  if(loadedImages === totalImages) {
    callback();
  }
}

function processContent(content) {
  const childElement = document.createElement('div')
  childElement.innerHTML = content
  const aTagElements = childElement.querySelectorAll('a')

  // '/'로 시작하는 a 태그의 href 속성에 대해 target 속성을 추가하고, href 속성을 변경한다.
  aTagElements.forEach(tag => {
    const href = tag.getAttribute('href')
    tag.setAttribute('target', '_blank')

    if (href.startsWith('/')) {
      tag.setAttribute('href', `https://www.newswire.co.kr${href}`)
    }
  })

  document.querySelector('#content').innerHTML = ''
  document.querySelector('#content').appendChild(childElement)

  let contentElement = document.querySelector('#content');
  checkAllImagesLoaded(contentElement, sendHeightToParent);
}

window.addEventListener(
  'load',
  function () {
    window.addEventListener('message', function (e) {
      const { content } = e.data

      if (content && content !== '') {
        processContent(content)
      }
    })
  },
  false
)