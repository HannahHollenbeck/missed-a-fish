function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
}

const canvas = document.getElementById("fishCanvas");
const context = canvas.getContext("2d");


if (!window.isFishTime) {

        const text = "come back at 11:12";

        const angle =
                getRandomInt(-35, 35) * Math.PI / 180;

        const x =
                getRandomInt(125, 275);

        const y =
                getRandomInt(75, 175);

        context.save();

        context.translate(x, y);

        context.rotate(angle);

        context.font = "28px Trebuchet MS, sans-serif";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fontWeight = "thin";

        context.fillText(text, 0, 0);

        context.restore();

} else {

        const canvas = document.getElementById("fishCanvas");
        const context = canvas.getContext("2d");

        const numFish = 10;
        const targetHeight = 125;

        const head = new Image();
        const body = new Image();
        const tail = new Image();

        let headInt = getRandomInt(1, numFish);
        let bodyInt = getRandomInt(1, numFish);
        let tailInt = getRandomInt(1, numFish);

        while (bodyInt === headInt || bodyInt === 6) {
                bodyInt = getRandomInt(1, numFish);
        }

        while (tailInt === headInt || tailInt === bodyInt) {
                tailInt = getRandomInt(1, numFish);
        }

        console.log(headInt, bodyInt, tailInt);


        head.src = `https://hannahhollenbeck.github.io/missed-a-fish/fish_pics/heads/fish${headInt}_head.png`;
        body.src = `https://hannahhollenbeck.github.io/missed-a-fish/fish_pics/bodies/fish${bodyInt}_body.png`;
        tail.src = `https://hannahhollenbeck.github.io/missed-a-fish/fish_pics/tails/fish${tailInt}_tail.png`;


        console.log(head.src, body.src, tail.src);


        const flipHorizontal = getRandomInt(0, 1) === 1;
        const angle = getRandomInt(-25, 25) * Math.PI / 180;

        Promise.all([
                new Promise(resolve => head.onload = resolve),
                new Promise(resolve => body.onload = resolve),
                new Promise(resolve => tail.onload = resolve)
        ]).then(() => {

                const tailAspectRatio = tail.width / tail.height;
                const bodyAspectRatio = body.width / body.height;
                const headAspectRatio = head.width / head.height;

                const newTailWidth = targetHeight * tailAspectRatio;
                const newBodyWidth = targetHeight * bodyAspectRatio;
                const newHeadWidth = targetHeight * headAspectRatio;

                const fishWidth =
                        newTailWidth +
                        newBodyWidth +
                        newHeadWidth;

                const fishHeight = targetHeight;

                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;

                const offsetX = getRandomInt(-115, 115);
                const offsetY = getRandomInt(-60, 70);

                const fishX = centerX + offsetX;
                const fishY = centerY + offsetY;

                context.save();
                context.translate(fishX, fishY);
                context.rotate(angle);

                if (flipHorizontal) {
                        context.scale(-1, 1);
                }

                let startX = -fishWidth / 2;
                let startY = -fishHeight / 2;

                context.drawImage(
                        tail,
                        startX,
                        startY,
                        newTailWidth,
                        targetHeight
                );

                context.drawImage(
                        body,
                        startX + newTailWidth - 1,
                        startY,
                        newBodyWidth,
                        targetHeight
                );

                context.drawImage(
                        head,
                        startX + newTailWidth + newBodyWidth - 2,
                        startY,
                        newHeadWidth,
                        targetHeight
                );

                context.restore();
        });

}