const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
    const introSpanElement = document.querySelector('main section.intro h2 span');
    const textArray = [
        'Frontend Developer',
        'Backend Developer',
        'C++ Developer',
        'Web Publisher',
        'Yonsei Postgraduate',
    ];
    const pushChar = function (charArray) {
        this.textContent += charArray.shift();
    };
    const popChar = function () {
        this.textContent = Array.prototype.slice
            .call(this.textContent, 0, this.textContent.length - 1)
            .join('');
    };
    const pushCallback = async (charArray) => {
        while (charArray.length > 0) {
            pushChar.call(introSpanElement, charArray);
            await delay(50 + Math.floor(Math.random() * 50));
        }
    };
    const popCallback = async () => {
        while (introSpanElement.textContent.length > 0) {
            popChar.call(introSpanElement);
            await delay(30);
        }
    };
    while (true) {
        for await (const text of textArray) {
            const charArray = text.split('');
            await pushCallback(charArray);
            await delay(3000);
            await popCallback();
        }
    }
})();

const headerElement = document.querySelector('header');
const introElement = document.querySelector('main section.intro');

window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        if (window.scrollY >= introElement.offsetHeight - headerElement.offsetHeight)
            headerElement.classList.add('active');
        else headerElement.classList.remove('active');
    });
});

const scrollTo = (target) => {
    window.scrollTo({ top: target.offsetTop - headerElement.offsetHeight, behavior: 'smooth' });
};
const headerButtons = document.querySelectorAll('header button[data-label]');
headerButtons.forEach((element) =>
    element.addEventListener('click', function (e) {
        scrollTo(document.querySelector(`main section.${this.dataset.label}`));
    }),
);
