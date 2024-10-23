const { untilIsLocated, untilIsVisible, sleep, removeElement, untilIsVisibleSpecific } = require("../../../core/interactions/conditions");
const { setValue, clearText, clickOn, pressEnter, getText } = require("../../../core/interactions/action");
const { myByCss, myByXpath } = require("../../../core/interactions/myBy");
const RegisterPage = require('../base/registerPage');

class CreateCampaignPage extends RegisterPage {
    nameInput = myByCss('input[data-name="name"]');
    statusSelectTrigger = myByCss('[data-name="status"] .selectize-input');
    typeSelectTrigger = myByCss('[data-name="type"] .selectize-input');
    budgetInput = myByCss('input[data-name="budget"]');
    targetListInput = myByCss('[data-name="targetLists"] input');
    excludingTargetListsInput = myByCss('[data-name="excludingTargetLists"] input');
    descriptionInput = myByCss('[data-name="description"] textarea');
    saveButton = myByCss('[data-name="save"]');
    cancelButton = myByCss('[data-name="cancel"]');
    autocompletedOption = myByCss('.autocomplete-suggestions:not([style*="display: none"]) > .autocomplete-suggestion');

    dateStarInput = myByCss('input[data-name="startDate"]');
    dateEndInput = myByCss('input[data-name="endDate"]');
    selectUserAssigned = myByCss('input[data-name="assignedUserName"]');
    selectTeams = myByCss('[data-name="teams"] input');

    selectTargetList = myByCss('[data-name="targetLists"] input');
    selectExcludingTargetLists = myByCss('[data-name="excludingTargetLists"] input');
    selectFormatContacts = myByCss('input[data-name="contactsTemplateName"]');
    selectFormatReference = myByCss('input[data-name="leadsTemplateName"]');
    selectFormatAccounts = myByCss('input[data-name="accountsTemplateName"]');
    checkedMail = myByCss('input[data-name="mailMergeOnlyWithAddress"]');

    messageNameRequired = myByCss('.popover-content > p');
    messageError = myByCss('.alert  .message');
    messageErrorDanger = myByCss('.alert-danger .message')
    
    calendar = myByCss('.datepicker');

    async isVisible() {
        await untilIsLocated(this.nameInput);
        await untilIsLocated(this.statusSelectTrigger);
        await untilIsLocated(this.typeSelectTrigger);
        await untilIsLocated(this.budgetInput);
        await untilIsLocated(this.targetListInput);
        await untilIsLocated(this.excludingTargetListsInput);
        await untilIsLocated(this.descriptionInput);
        await untilIsLocated(this.saveButton);
    }

    async setValues(name, status, type, budget, targetList, excludingTargetList, description) {
        await this.setValueName(name);
        await this.setValueStatus(status);
        await this.setValueType(type);
        await this.setValueBudget(budget);
        await this.setValueTargetList(targetList);
        await this.setValueExcludingTargetList(excludingTargetList);
        await this.setValueDescription(description);
    }

    async setValueName(name) {
        await untilIsVisible(this.nameInput);
        await clearText(this.nameInput);
        await setValue(this.nameInput, name);
    }

    async setValueStatus(status) {
        await untilIsVisible(this.statusSelectTrigger);
        await clickOn(this.statusSelectTrigger);
        let optionLocator;

        switch (status) {
            case 'Activo':
                optionLocator = myByCss('[data-value="Active"]');
                break;
            case 'Planificación':
                optionLocator = myByCss('[data-value="Planning"]');
                break;
            case 'Inactivo':
                optionLocator = myByCss('[data-value="Inactive"]');
                break;
            case 'Completada':
                optionLocator = myByCss('[data-value="Complete"]');
                break;
            default:
                throw new Error(`Estatus "${status}" no encontrado`);
        }

        await clickOn(optionLocator);
    }

    async setValueType(type) {
        await untilIsVisible(this.typeSelectTrigger);
        await clickOn(this.typeSelectTrigger);
        let optionLocator;

        switch (type) {
            case 'Correo':
                optionLocator = myByXpath("//*[text()='Correo']");
                break;            
            case 'Periódico':
                optionLocator = myByCss('[data-value="Newsletter"]');
                break;
            case 'Web':
                optionLocator = myByCss('[data-value="Web"]');
                break;
            case 'Televisión':
                optionLocator = myByCss('[data-value="Television"]');
                break;
            case 'Radio':
                optionLocator = myByCss('[data-value="Radio"]');
                break;
            case 'Correo Físico':
                optionLocator = myByCss('[data-value="Mail"]');
                break;
            
            default:
                throw new Error(`Tipo "${type}" no encontrado`);
        }

        await clickOn(optionLocator);
    }

    async setValueBudget(budget) {
        await untilIsVisible(this.budgetInput);
        await clearText(this.budgetInput);
        await clearText(this.budgetInput);
        await setValue(this.budgetInput, budget);
    }    

    async setValueDescription(description) {
        await untilIsVisible(this.descriptionInput);        
        await clearText(this.descriptionInput);
        await setValue(this.descriptionInput, description);
    }

    async setValueDateStar(date) {
        await untilIsVisible(this.dateStarInput);
        await clearText(this.dateStarInput);
        await setValue(this.dateStarInput, date);
    }

    async setValueDateEnd(date) {
        await untilIsVisible(this.dateEndInput);
        await clearText(this.dateEndInput);
        await setValue(this.dateEndInput, date);
    }

    async setValueUser(user){
        await untilIsVisible(this.selectUserAssigned);
        await setValue(this.selectUserAssigned, user);           
        await removeElement(this.calendar)
        await sleep(400);
        await untilIsVisible(this.autocompletedOption);
        await pressEnter(this.selectUserAssigned);
    }

    async setValueTeam(team){
        await untilIsVisible(this.selectTeams);
        await setValue(this.selectTeams, team);        
        await sleep(300);
        await untilIsVisible(this.autocompletedOption);
        await pressEnter(this.selectTeams);
    }

    async setValueTargetList(targetList){
        await untilIsVisible(this.selectTargetList);
        await setValue(this.selectTargetList, targetList);        
        await sleep(300);
        await untilIsVisible(this.autocompletedOption);
        await pressEnter(this.selectTargetList);
    }

    async setValueExcludingTargetList(targetList){
        await untilIsVisible(this.selectExcludingTargetLists);
        await setValue(this.selectExcludingTargetLists, targetList);        
        await sleep(300);
        await untilIsVisible(this.autocompletedOption);
        await pressEnter(this.selectExcludingTargetLists);
    }

    async setValueFormatContacts(contacts){
        await untilIsVisible(this.selectFormatContacts);
        await setValue(this.selectFormatContacts, contacts);        
        await sleep(300);
        await untilIsVisible(this.autocompletedOption);
        await pressEnter(this.selectFormatContacts);
    }


    async setValueFormatReference(reference){
        await untilIsVisible(this.selectFormatReference);
        await setValue(this.selectFormatReference, reference);        
        await sleep(300);
        await untilIsVisible(this.autocompletedOption);
        await pressEnter(this.selectFormatReference);
    }

    async setValueFormatAccounts(account){
        await untilIsVisible(this.selectFormatAccounts);
        await setValue(this.selectFormatAccounts, account);        
        await sleep(300);
        await untilIsVisible(this.autocompletedOption);
        await pressEnter(this.selectFormatAccounts);
    }

    async clickSaveButton() {
        await untilIsVisible(this.saveButton);
        await clickOn(this.saveButton);
        await sleep(200);
    }

    async getTextMessageNameRequired() {
        return await getText(this.messageNameRequired);
    }

    async getTextMessageError() {
        return await getText(this.messageError);
    }

    async isVisibleMessageError() {
        return await untilIsVisibleSpecific(this.messageErrorDanger);
    }
}

module.exports = new CreateCampaignPage();
