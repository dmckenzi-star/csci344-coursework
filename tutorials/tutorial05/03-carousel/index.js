let currentPosition = 0;
//declare the starting position at 0
let gap = 10;
const slideWidth = 400;

function moveCarousel(direction) {
    //selects multiple items carousel items
    const items = document.querySelectorAll(".carousel-item");
    //if direction is forward
    if (direction == "forward") {
        // minus 2 b/c first 2 slides already showing
        //nested if statement in forward
        if (currentPosition >= items.length - 2) {
            //current position is greater than items length - 2
            return false;
        }
        currentPosition++;
        //add 1 to current Postion
    } else {
        //else if statement to check if at the starting position
        if (currentPosition == 0) {
            return false;
        }
        //minus 1
        currentPosition--;
    }

    const offset = (slideWidth + gap) * currentPosition;
        //looping through each item in items and styling the transform while going through the carousel
    for (const item of items) {
        item.style.transform = `translateX(-${offset}px)`;
    }
}

