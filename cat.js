var model = {
    currentCat: null,
    cats: [{
        'name': 'Cute Little Cat',
        'clicks': 0,
        'image': 'cat1.jpg'
    },{
        'name': 'Sherlock Cat',
        'clicks': 0,
        'image': 'cat2.jpg'
    },{
        'name': 'Two Bros',
        'clicks' :0,
        'image': 'cat3.jpg'
    }]
};

var controller = {
    init: function() {
        model.currentCat = model.cats[0];

        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    incrementCounter: function() {
        model.currentCat.clicks++;
        catView.render();
    }
}

var catView = {

    init: function() {
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-image');
        this.catClicksElem = document.getElementById('cat-clicks');

        this.catElem.addEventListener('click', function() {
            controller.incrementCounter();
            catView.render();
        });

        this.render();
    },

    render: function() {
        var currentCat = controller.getCurrentCat();
        this.catClicksElem.textContent = currentCat.clicks;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.image;
    }
}

var catListView = {
    init: function() {
        this.catListElem = document.getElementById('cat-list');

        this.render();
    },

    render: function() {
        var cat, elem, i;
        var cats = controller.getCats();

        this.catListElem.innerHTML = '';

        for(i = 0; i < cats.length; i++) {
            cat = cats[i];

            var div = document.createElement('div');
            div.className = 'cat-list-item';

            div.insertAdjacentHTML('afterbegin', '<img src="' + cat.image + '" class="cat-list-img">');

            div.addEventListener('click', (function(catCopy) {
                return function() {
                    controller.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            this.catListElem.appendChild(div);
        }
    }
}

controller.init();