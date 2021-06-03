// Fix for odd - even css targeting when user skips a half size section.
document.addEventListener('turbolinks:load', function() {
  const featurePageContent = document.getElementById('featurePageContent')

  if (!featurePageContent) return

  const halfWidthElements = featurePageContent.querySelectorAll('.cms_full_section')

  halfWidthElements.forEach(function(elem) {
    if (elem.previousElementSibling && elem.previousElementSibling.classList.contains('cms_half_section')) {
      const siblings = getSiblings(elem);

      if (!isEven(siblings.length)) { insertPlaceHolder(elem) }
    }
  })

  function insertPlaceHolder(elem) {
    const el = document.createElement('aside');
    el.classList.add('col-6', 'cms_half_section', 'd-none')

    elem.insertAdjacentElement('beforebegin', el);
  }

  function isEven(value) {
    if (value % 2 === 0) {
      return true;
    } else {
      return false;
    }
  }

  function getSiblings(elem) {
    // Setup siblings array and get the first sibling
    const siblings = [];
    let sibling = elem.parentNode.firstChild;

    // Loop through each sibling and push to the array
    while (sibling) {
      if (sibling === elem) break

      if (sibling.nodeType === 1 && sibling !== elem && !sibling.classList.contains('cms_full_section')) {
        siblings.push(sibling);
      }
      sibling = sibling.nextElementSibling;
    }
    return siblings;
  };
})
