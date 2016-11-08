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
        adminView.init();
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
    },

    showEditView: function() {
        adminView.show();
    },

    saveCat: function() {
        model.currentCat.name = document.getElementById('name-input').value;
        model.currentCat.image = document.getElementById('image-input').value;
        model.currentCat.clicks = document.getElementById('clicks-input').value;

        catView.render();
        adminView.hide();
    }
}

var catView = {

    init: function() {
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-image');
        this.catClicksElem = document.getElementById('cat-clicks');

        this.editButton = document.getElementById('edit-button');

        this.catElem.addEventListener('click', function() {
            controller.incrementCounter();
            catView.render();
        });

        this.editButton.addEventListener('click', function() {
            controller.showEditView();
        });

        this.render();
    },

    render: function() {
        var currentCat = controller.getCurrentCat();
        this.catClicksElem.textContent = currentCat.clicks;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.image;
        adminView.render();
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

var adminView = {
    init: function() {
        this.nameInput = document.getElementById('name-input');
        this.imageInput = document.getElementById('image-input');
        this.clicksInput = document.getElementById('clicks-input');
        this.editArea = document.getElementById('edit-area');

        this.cancelButton = document.getElementById('cancel-button');
        this.saveButton = document.getElementById('save-button');

        this.cancelButton.addEventListener('click', function() {
            this.hide();
        }.bind(this));

        this.saveButton.addEventListener('click', function() {
            controller.saveCat();
        });
    },

    render: function() {
        var currentCat = controller.getCurrentCat();

        this.hide();

        this.nameInput.value = currentCat.name;
        this.imageInput.value = currentCat.image;
        this.clicksInput.value = currentCat.clicks;
    },

    show: function() {
        this.render();
        this.editArea.style.display = 'inline-block';
    },

    hide: function() {
        this.editArea.style.display = 'none';
    }
}

controller.init();