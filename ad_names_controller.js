var AdNamesController = class {
    constructor(staticDataEl) {
        this._fieldset = $('.modal#adZone fieldset #cloning-feature');
        this._fieldset.html('');
        this._checkbox = undefined;
        this._prefix = undefined;
        this._lastPrefixValLen = 0;

        this._initFieldTemplate();
        this._addIterationsCheckbox()
        this._addIterations();
        this._bindOnChangeIterationsCheckbox();

        this._fieldset.append(
            '<div class="form-group col-xs-12 ad-cloning-el"><h5>Ad names</h5></div>'
        );

        this._fieldset.append(
            $('<input/>', { type: 'hidden', name: 'action', value: 'clone' })
        );

        this._addCheckbox();
        this._addPrefix();
        this._addFilledNames(staticDataEl);
        this._fillPrefix();
        this._bindOnChangePrefix();
        this._bindOnChangeCheckbox();
    }


    _fillField(field, name, label, value, type) {
        let labelEl = field.find('label');
        labelEl.attr('for', name);
        labelEl.text(label);

        let inputEl = field.find('input');
        inputEl.attr('name', name);
        inputEl.attr('placeholder', label);
        inputEl.attr('type', type);
        inputEl.val(value);
    }

    _initFieldTemplate() {
        this._fieldTemplate = $('#fieldTemplate').clone();
        this._fieldTemplate.attr('id', '');
        this._fieldTemplate.css('display', 'inherit');
        this._fieldTemplate.addClass('ad-cloning-el');
    }

    _addIterationsCheckbox() {
        this._iterations_checkbox = this._fieldTemplate.clone();
        this._fillField(this._iterations_checkbox, 'manual-iterations-checkbox', 'Set number of ad iterations ', '', 'checkbox');
        let inputEl = this._iterations_checkbox.find('input');
        inputEl.prop('checked', false);
        inputEl.removeClass('form-control');
        this._fieldset.append(this._iterations_checkbox);
    }

    _addIterations() {
        let iterationsField = this._fieldTemplate.clone();
        this._fillField(iterationsField, 'iterations', '# of ad iterations for each ad', 0, 'number');
        iterationsField.hide();
        this._fieldset.append(iterationsField);
    }

    _addCheckbox() {
        this._checkbox = this._fieldTemplate.clone();
        this._fillField(this._checkbox, 'edit-prefix-checkbox', 'Edit ad names prefix ', '', 'checkbox');
        let inputEl = this._checkbox.find('input');
        inputEl.prop('checked', true);
        inputEl.removeClass('form-control');
        this._fieldset.append(this._checkbox);
    }

    _addPrefix() {
        this._prefix = this._fieldTemplate.clone();
        this._fillField(this._prefix, 'ad-names-prefix', 'Ad names Prefix', '', 'text');
        this._fieldset.append(this._prefix);
    }


    _addFilledNames(staticDataEl) {
        let adNameFieldTemplate = this._fieldTemplate.clone();
        adNameFieldTemplate.addClass('ad-name-field')
        adNameFieldTemplate.find('input').attr('readonly', '')

        var self = this;
        staticDataEl.data('ads').forEach(function (ad, i) {
            let field = adNameFieldTemplate.clone()
            let fieldLabel = `Ad №${i + 1} name`;
            self._fillField(field, 'clone-ad-name[]', fieldLabel, ad.name, 'text')
            self._fieldset.append(
                $('<input/>', { type: 'hidden', name: 'clone-ad-id[]', value: ad.id })
            );
            self._fieldset.append(field)
        })
    }



    _getNames() {
        let names = [];
        this._fieldset.find('.ad-name-field input').each((i, elem) => {
            var currentName = $(elem).val();
            names.push(currentName)
        })
        return names;
    }



    _getPrefixVal() {
        const isAllEqual = arr => arr.every(v => v === arr[0])
        const getMinNameLen = names => names.reduce((a, b) => (
            (a.length <= b.length ? a : b).length
        ))

        let names = this._getNames();
        let minNameLen = getMinNameLen(names);
        var currentPrefixLen = 0;

        for (let i = 0; i < minNameLen; i++) {
            let currentSymbols = [];

            names.forEach(name => {
                currentSymbols.push(name[i])
            })
            if (!isAllEqual(currentSymbols)) {
                currentPrefixLen = i;
                break;
            }
        }
        return names[0].slice(0, currentPrefixLen);
    }



    _fillPrefix() {
        let prefixVal = this._getPrefixVal();
        this._lastPrefixValLen = prefixVal.length;
        this._prefix.find('input').val(prefixVal);
    }


    _bindOnChangePrefix() {
        this._prefix.find('input').on('input', this._prefix, e => {
            let newPreffix = $(e.target).val();

            this._fieldset.find('.ad-name-field input').each((i, elem) => {
                let currentName = $(elem).val();
                let currentNameSuffix = currentName.slice(this._lastPrefixValLen)
                $(elem).val(newPreffix + currentNameSuffix)
            })
            this._lastPrefixValLen = newPreffix.length;
        });
    }

    _bindOnChangeIterationsCheckbox() {
        let checkboxInput = this._fieldset.find("input[name='manual-iterations-checkbox']");
        let checkboxField = checkboxInput.parent();
        checkboxInput.on('change', checkboxField, e => {
            let fieldWrapper = this._fieldset.find('[name="iterations"]').parent();
            if (e.target.checked) {
                fieldWrapper.show();
                this._fillPrefix();
            }
            else {
                fieldWrapper.hide();
            }
        })
    }

    _bindOnChangeCheckbox() {
        let checkboxInput = this._fieldset.find("input[name='edit-prefix-checkbox']");
        let checkboxField = checkboxInput.parent();
        checkboxInput.on('change', checkboxField, e => {
            let prefixField = this._fieldset.find('[name="ad-names-prefix"]').parent();
            let nameInputs = this._fieldset.find('.ad-name-field input');

            if (e.target.checked) {
                prefixField.show();
                nameInputs.attr('readonly', '');
                this._fillPrefix();
            }
            else {
                prefixField.hide();
                nameInputs.removeAttr('readonly');
            }
        })
    }

};


module.exports = AdNamesController;
