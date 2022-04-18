
const openFilter = document.querySelector('.openFilter')

openFilter.addEventListener('click', () => onFilterMenuButtonClick(false))

export function onFilterMenuButtonClick(search) {
    var content = openFilter.nextElementSibling
    
    if (!search) {
        openFilter.classList.toggle('active')
        
        if (content.style.maxHeight) {
            content.style.maxHeight = null
        }
        else {
            content.style.maxHeight = content.scrollHeight + 'px'
        }
    }
    else{
        if (content.style.maxHeight) {
            openFilter.classList.toggle('active')
            content.style.maxHeight = null
        }
    }

}