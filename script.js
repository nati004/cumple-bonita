document.addEventListener("DOMContentLoaded", function () {
    const h1 = document.querySelector("h1");
    const continueBtn = document.getElementById("continue");
    const yesBtn = document.getElementById("yes");

    // 1. Mantiene el "oh..." durante 4 segundos completos
    setTimeout(() => {
        if (h1) {
            h1.classList.add("hidden");
        }
        document.body.classList.add("dark");
    }, 4000);

    // 2. Al segundo 5 (4s visible + 1s de desvanecimiento del oh), aparece la vela rápidamente
    setTimeout(() => {
        document.body.classList.add("candle-visible");
    }, 5000);

    // 3. Al hacer clic en "[continuar]", pasa a la pregunta de seguridad
    if (continueBtn) {
        continueBtn.addEventListener("click", function () {
            document.body.classList.add("candle-clicked");
        });
    }

    // 4. Al hacer clic en "[sí]", redirige a la página del pastel
    if (yesBtn) {
        yesBtn.addEventListener("click", function () {
            window.location.href = "pastel.html";
        });
    }
});

/* ==========================================
   FUNCIÓN DEL SOBRE (Para pastel.html)
   ========================================== */
function openEnvelope() {
    const container = document.querySelector('.envelope-container');
    const envelopeImg = document.getElementById('envelope-img');

    if (container && envelopeImg) {
        container.classList.add('opening');

        setTimeout(() => {
            envelopeImg.src = 'sobreabierto.PNG';
        }, 200);

        setTimeout(() => {
            window.location.href = 'carta.html';
        }, 1200);
    }
}

/* ==========================================
   LÓGICA DEL PASTEL Y VELAS (Para pastel.html)
   ========================================== */
window.addEventListener("load", function() {
    const cake = document.querySelector("#cake");
    const title = document.getElementById("happy-birthday");

    if (cake) cake.classList.add("show");
    if (title) {
        title.classList.add("show");
        title.style.opacity = "1";
        title.style.visibility = "visible";
    }

    setTimeout(startCandles, 2000); 
});

function startCandles() {
    const wrapper = document.getElementById("candles-wrapper");
    if (!wrapper) return;
    
    const totalCandles = 14;
    let currentCandle = 1;

    const interval = setInterval(function() {
        if (currentCandle > totalCandles) {
            clearInterval(interval);
            return;
        }

        const img = document.createElement("img");
        img.src = `vela${currentCandle}.PNG`; 
        img.alt = `Vela ${currentCandle}`;
        img.classList.add("candle-item", `candle-${currentCandle}`);

        img.onerror = function() {
            this.style.display = 'none';
        };

        wrapper.appendChild(img);
        setTimeout(() => img.classList.add("show"), 50);

        currentCandle++;
    }, 600);
}

/* ==========================================
   JUEGO DE UNIR FRASES (Para pastel.html)
   ========================================== */
document.addEventListener("DOMContentLoaded", function () {
    let selectedLeft = null;
    let matchesCount = 0;
    const totalPairs = 5;

    const leftItems = document.querySelectorAll("#left-column .game-item");
    const rightItems = document.querySelectorAll("#right-column .game-item");
    const messageDiv = document.getElementById("game-message");

    leftItems.forEach(item => {
        item.addEventListener("click", function () {
            if (this.classList.contains("matched")) return;

            leftItems.forEach(i => i.classList.remove("selected"));
            this.classList.add("selected");
            selectedLeft = this;
        });
    });

    rightItems.forEach(item => {
        item.addEventListener("click", function () {
            if (this.classList.contains("matched") || !selectedLeft) return;

            const leftId = selectedLeft.getAttribute("data-id");
            const rightId = this.getAttribute("data-id");

            if (leftId === rightId) {
                selectedLeft.classList.remove("selected");
                selectedLeft.classList.add("matched");
                this.classList.add("matched");

                selectedLeft = null;
                matchesCount++;

                if (matchesCount === totalPairs) {
                    messageDiv.style.display = "none";
                    
                    // Ocultar las parejas de botones al terminar
                    const gameBoard = document.querySelector(".game-board");
                    if (gameBoard) {
                        gameBoard.classList.add("hidden");
                    }

                    // Mostrar la imagen grande de yohada.PNG con el mensaje
                    const winContainer = document.getElementById("win-container");
                    if (winContainer) {
                        winContainer.classList.remove("hidden");
                    }
                }
            } else {
                this.classList.add("selected");
                setTimeout(() => {
                    this.classList.remove("selected");
                    if (selectedLeft) selectedLeft.classList.remove("selected");
                    selectedLeft = null;
                }, 500);
            }
        });
    });
});