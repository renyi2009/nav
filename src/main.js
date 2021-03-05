const $site = $('.site')
const $siteList = $('.siteList')
const $lastList = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' }
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //删除 \ 开头的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {

        // <div class="logo">${simplifyUrl(node.url)[0]}</div>
        const $li = $(`<li>
            <div class="site">
                <div class="logo">
                    <img style="width:24px;" src= ${JSON.stringify("https://www." + simplifyUrl(node.url) + "/favicon.ico")}> 
                </div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class='close'>
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastList)
        console.log('----')
        console.log(node.url)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('mouseenter', () => {
            $li.css("background-color", "rgba(255,255,255,0.1");
        })
        $li.on('mouseleave', () => {
            $li.css("background-color", "");
        })

        // 删除按钮
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()

$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是？')
    console.log(url)
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simplifyUrl(url)[0],
        url: url
    })
    render()
})

// 关闭页面之前 做。。。
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string) // 在本地缓存一个 x，内容为 string
}

$(document).on('keypress', (e) => {
    const { key } = e //key = e.key
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})