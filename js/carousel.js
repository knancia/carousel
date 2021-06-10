// - - - - - Definição da variável que controlará as imagens 
let i = 0;

// - - - - - Aqui é inserido as url's das imagens
const srcImg = [
    'assets/images/slide/img_1.png',
    'assets/images/slide/img_2.png',
    'assets/images/slide/img_3.png',
    'assets/images/slide/img_4.png',
    'assets/images/slide/img_5.png', 
]

// - - - - - Responsável por inserir as imagens no código HTML
const itemImg = document.getElementById("container_img")
const img = document.createElement("img")
img.id = "imgSlide"
img.src = srcImg[i]
itemImg.appendChild(img)

// - - - - - Atribui ação aos elementos que compõem o Carousel
const btn_prevSlide = document.getElementById("btn_carousel_left")
const btn_nextSlide = document.getElementById("btn_carousel_right")
const btn_dotSlide = document.getElementById("dotSlide")

btn_prevSlide.onclick = () => { prevSlide();  }
btn_nextSlide.onclick = () => { nextSlide() }
btn_dotSlide.onclick = (e) => { dotSlide(e) }

// - - - - - Gera os botões de ancora dos slides
const cont_dotSlide = document.getElementById("dotSlide")

for(let j = 0; j < srcImg.length; j++) {
    let divDotSlide = document.createElement("div")
    divDotSlide.id = j
    cont_dotSlide.appendChild(divDotSlide)
}

// - - - - - Insere Animação dos botões ancora e da barra de tempo
insertAnimate_dotSlide = () => {
    let currentDot = document.querySelectorAll("#dotSlide > div")[i]
    currentDot.classList.add("btn_dotSlide")

    const timerChangeSlide = document.createElement("span")
    cont_dotSlide.appendChild(timerChangeSlide)
}

insertAnimate_dotSlide()

// - - - - - Remove Animação dos botões ancora e da barra de tempo
removeAnimate_dotSlide = () => {
    document.querySelector(".btn_dotSlide").classList.remove("btn_dotSlide")
    document.querySelector("#dotSlide > span").remove()   
}

// - - - - - Função que mostra a posição e quantidades de slides
positionCounter = () => {
    document.getElementById("positionCounter").innerHTML = `${ parseInt(i) + parseInt(1) } / ${srcImg.length}`
}

positionCounter()

// - - - - - Função do botão ancora
dotSlide = (e) => {
    removeAnimate_dotSlide()

    i = e.target.id
    img.src = srcImg[i]
    
    timer.reset(5000)
    positionCounter()
    insertAnimate_dotSlide()
}

// - - - - - Função para voltar slide
prevSlide = () => {
    removeAnimate_dotSlide()

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
    }, 500  )

    timer.reset(5000)
    positionCounter()
    insertAnimate_dotSlide()
}

// - - - - - Função para avançar slide
nextSlide = () => {
    removeAnimate_dotSlide()

    if( i == (srcImg.length - 1) )
        i = -1

    document.getElementById("imgSlide").classList.add("removeSlide_next")

    img.src = srcImg[ i == -1 ? (srcImg.length - 1) : i ]
    
    i++

    const fakeImg = document.createElement("img")
    fakeImg.id = "fakeImg_next"
    fakeImg.src = srcImg[i]
    itemImg.append(fakeImg)

    setTimeout(() => {
        img.src = srcImg[i]
        img.classList.remove("removeSlide_next")
        fakeImg.remove()
    }, 500  )

    timer.reset(5000)
    positionCounter()
    insertAnimate_dotSlide()
}

// - - - - - Responsável por controlar o tempo de transição automatico e por resetar
// a animação quando houver interação com os botões
// https://stackoverflow.com/questions/8126466/how-do-i-reset-the-setinterval-timer
function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = () => {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    this.start = () => {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    this.reset = (newT = t) => {
        t = newT;
        return this.stop().start();
    }
}

// - - - - - Inicialização da transição automatica
var timer = new Timer(() => {
    nextSlide()
}, 5000);