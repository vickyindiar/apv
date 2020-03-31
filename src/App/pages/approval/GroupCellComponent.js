import React from 'react';
import { CheckBox } from 'devextreme-react/check-box';
import { useSelector } from "react-redux";
import $ from 'jquery';


function GroupCellComponent({gridRef, checkBoxRef, info, keyFieldName}) {
    
    const customSelectionFlag = useSelector(state => state.apv.customSelectionFlag);
    
    const getKeysFromDataSource =  (keys, groupValue, fieldName) => {
        var colFields = fieldName.split(".");
        var dataSource = info.component._options.dataSource.store.data;
        var filteredKeys = $.grep(dataSource, function (el) {
            var result = el;
            for (var index = 0; index < colFields.length; index++) {
                var field = colFields[index];
                result = result[field];
                if (!$.isPlainObject(result))
                    break;
            }
            return result === groupValue;
        });
        for (var i = 0; i < filteredKeys.length; i++) {
            var value = filteredKeys[i][keyFieldName];
            if (value && keys.indexOf(value) === -1) // invisible key
                keys.push(value);
        }
    }

    const getKeys = (data, keys, groupedColumnName, groupKey) => {
        if (!groupKey)
            groupKey = data.key;
        var dataItems = data.items || data.collapsedItems || data; // check if it's a group row that has nested rows

        for (var i = 0; i < dataItems.length; i++) {
            var childItems = dataItems[i].items || dataItems[i].collapsedItems;
            if (childItems) {
                getKeys(dataItems[i], keys, groupedColumnName, groupKey);
            } else
                keys.push(dataItems[i][keyFieldName]);
        }
        if (data.isContinuation || data.isContinuationOnNextPage)
            getKeysFromDataSource(keys, groupKey, groupedColumnName);

        return keys;
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
     const colField = info.column.dataField.replace(".", "");
     const editorID = "groupCheckBox" + colField + info.key;  
     const groupKey = info.key;       
     const rowKeys = getKeys(info.data, [], info.column.dataField);
     const defaultValue = checkIfKeysAreSelected(rowKeys, info.component.getSelectedRowKeys());


     const onValueChanged = (e) => {
            if (customSelectionFlag)
                return;
            var rowKeys = JSON.parse(e.element.dataset.keys);
            if (e.value)
                info.component.selectRows(rowKeys, true);
            else
                info.component.deselectRows(rowKeys);
     }

    return (
        <>
            <CheckBox
                elementAttr = {{ id: editorID, className:'customSelectionCheckBox', 'data-keys':JSON.stringify(rowKeys), 'data-groupkeys':JSON.stringify(groupKey) }}
                ref={checkBoxRef}
                text= {info.column.caption + ': ' + info.text}
                defaultValue= {defaultValue}
               // value={defaultValue}
                onValueChanged = { onValueChanged }
            />
        </>
    )
}

export default React.memo(GroupCellComponent)
