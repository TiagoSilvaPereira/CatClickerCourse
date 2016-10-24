var Cat = function(options) {

    this.options = options;
    this.clicks = 0;

    this.addCatToList = addCatToList;
    this.selectAndShowCat = selectAndShowCat;
    this.increaseClicks = increaseClicks;
    this.createCat = createCat;
    this.showCat = showCat;
    this.setName = setName;
    this.setImage = setImage;
    this.setClicks = setClicks;
    this.createName = createName;
    this.createImage = createImage;
    this.createClicks = createClicks;

    function addCatToList() {
        var list = document.getElementById('cat-list');
        var div = document.createElement('div');
        div.className = 'cat-list-item';
        div.id = 'cat-' + this.options.id;

        div.insertAdjacentHTML('afterbegin', '<img src="cat' + this.options.id + '.jpg" class="cat-list-img">');

        div.addEventListener('click', function() {

                this.selectAndShowCat();

        }.bind(this));

        list.appendChild(div);
    }

    function selectAndShowCat() {
        this.createCat();
        this.showCat();
    }

    function createCat() {
        var cat = document.getElementById('cat'),
            viewArea = document.getElementById('view-area'),
            image = this.createImage(),
            name = this.createName(),
            clicks = this.createClicks();

        cat.outerHTML = '';
        delete cat;

        cat = document.createElement('div');
        cat.className = 'cat-container';
        cat.id = 'cat';

        cat.appendChild(image);
        cat.appendChild(name);
        cat.appendChild(clicks);

        cat.addEventListener('click', function() {
            this.increaseClicks();
        }.bind(this));

        viewArea.appendChild(cat);
    }

    function showCat() {
        this.setName();
        this.setImage();
        this.setClicks();
    }

    function increaseClicks() {
        this.clicks++;
        this.setClicks();
    }

    function setName() {
        document.getElementById('cat-name-' + this.options.id).innerHTML = this.options.name;
    }

    function setImage() {
        document.getElementById('cat-image-' + this.options.id).src = 'cat' + this.options.id + '.jpg';
    }

    function setClicks() {
        document.getElementById('cat-clicks-' + this.options.id).innerHTML = this.clicks;
    }

    function createImage() {
        var element = document.createElement('img');
        element.className = 'cat';
        element.id = 'cat-image-' + this.options.id;
        return element;
    }

    function createName() {
        var element = document.createElement('span');
        element.className = 'name';
        element.id = 'cat-name-' + this.options.id;
        return element;
    }

    function createClicks() {
        var element = document.createElement('span');
        element.className = 'clicks';
        element.id = 'cat-clicks-' + this.options.id;
        return element;
    }

}