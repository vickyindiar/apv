import $ from 'jquery';


const getValueFromArray = (grid, keyValue, dataField, data, keyFieldName) => {
    var selection = grid.getSelectedRowsData();
    if (selection.length === 0)
        selection = data;
    var result = $.grep(selection, function (el) { return el[keyFieldName] === keyValue })[0];
 
    if (!result){
        var d = data.find(e => e[keyFieldName] === keyValue);
        if(!d){return null;}
        var isGrouping = grid.getVisibleRows().findIndex(e => e.key.includes(d[dataField]));
        if(isGrouping === -1){ return null; } else{ return d[dataField]; }
    }
    var colFields = dataField.split(".");
    for (var index = 0; index < colFields.length; index++) {
        var field = colFields[index];
        result = result[field];
        if (!$.isPlainObject(result))
            break;
    }
    return result;
}

const checkIfKeysAreSelected = (currentKeys, selectedKeys) => {
    var count = 0;
    if (selectedKeys.length === 0)
        return false;
    for (var i = 0; i < currentKeys.length; i++) {
        var keyValue = currentKeys[i];
        if (selectedKeys.indexOf(keyValue) > -1) // key is not selected
            count++;
    }
    if (count === 0)
        return false;
    if (currentKeys.length === count)
        return true;
    else
        return undefined;
}


const getSelector = (grid, keyValue, dataField, data, keyFieldName) => {
    var d = data.find(e => e[keyFieldName] === keyValue);
    var isGrouping = grid.getVisibleRows().find(e => e.key.includes(d[dataField]));
    if(isGrouping)
         return isGrouping.key.join();
    else
        return null;
}

export const synchronizeCheckBoxes = (grid, currenKeys, keys, groupedColumnNames, isSelected, data, keyFieldName, chekbox) => {
    if (!keys || keys.length === 0  ||!groupedColumnNames || !grid)
        return;
    var synchronizedCheckBoxes = [];
    for (var j = 0; j < groupedColumnNames.length; j++) {
  
        for (var i = 0; i < keys.length; i++) {
            var keyValue = keys[i];
            var rowIndex = grid.getRowIndexByKey(keyValue); //
            var columnField = groupedColumnNames[j];

            var groupRowValue = grid.cellValue(rowIndex, columnField);
            if (!groupRowValue) groupRowValue = getValueFromArray(grid, keyValue, columnField, data, keyFieldName);
            if (groupRowValue == null) continue;

            columnField = columnField.replace(".", "");

            var groupkeyselector = getSelector(grid, keyValue, columnField, data, keyFieldName);
            if(!groupkeyselector == null)continue;

            var editorName = "groupCheckBox" + columnField +  groupkeyselector; 
            if (synchronizedCheckBoxes.indexOf(editorName) > -1) continue;

            synchronizedCheckBoxes.push(editorName);
            var checkBoxEl = document.getElementById(editorName);
            var value = isSelected;
            var rowKeys = $(checkBoxEl).data("keys");
            if (value && rowKeys)
                value = checkIfKeysAreSelected(rowKeys, grid.getSelectedRowKeys());
            let groupKey = $(checkBoxEl).data('groupkeys');
            let indexInstance = grid.getRowIndexByKey(groupKey);
            if(indexInstance === -1){ continue; }
            var editor = chekbox.current[indexInstance].current ? chekbox.current[indexInstance].current.instance  : null;
            if (editor){
                if (editor.option('value') !== value)
                editor.option("value", value);
            }
        }
    }
}


export const getGroupedColumns = (dataGrid) => {
    var colNames = [];
    for (let i = 0; i < dataGrid.columnCount(); i++) {
        if (dataGrid.columnOption(i, "groupIndex") > -1) {
            colNames.push(dataGrid.columnOption(i, "dataField"));
        }
    }
    return colNames;
}
