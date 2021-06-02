var i = 0;
const srcImg = [
    'assets/images/slide/img_6.png',
    'assets/images/slide/img_7.png',
    'assets/images/slide/img_8.png',
    'assets/images/slide/img_9.png',
    'assets/images/slide/img_10.png' 
]

const itemImg = document.getElementById("container_img")
const img = document.createElement("img")
img.id = "imgSlide"
img.src = srcImg[i]
itemImg.appendChild(img)

const prevSlide = document.getElementById("btn_carousel_left")
const nextSlide = document.getElementById("btn_carousel_right")

prevSlide.onclick = () => {
    if( i == 0 )
        i = (srcImg.length)

    document.getElementById("imgSlide").classList.add("removeSlide_prev")

    img.src = srcImg[ i == srcImg.length ? 0 : i ]
    
    i--

    const fakeImg = document.createElement("img")
    fakeImg.id = "fakeImg_prev"
    fakeImg.src = srcImg[i]
    itemImg.append(fakeImg)

    setTimeout(() => {
        img.src = srcImg[i]
        img.classList.remove("removeSlide_prev")
        fakeImg.remove()
    }, 900  )
}

nextSlide.onclick = () => {
    if( i == (srcImg.length - 1) )
        i = -1

        document.getElementById("imgSlide").classList.add("removeSlide_next")

        img.src = srcImg[ i == -1 ? (srcImg.length - 1) : i]
        
        i++
    
        const fakeImg = document.createElement("img")
        fakeImg.id = "fakeImg_next"
        fakeImg.src = srcImg[i]
        itemImg.append(fakeImg)
    
        setTimeout(() => {
            img.src = srcImg[i]
            img.classList.remove("removeSlide_next")
            fakeImg.remove()
        }, 900  )
}