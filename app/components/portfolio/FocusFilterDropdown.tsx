import React from 'react';

import { MSG_VIEW_FOCUS_CTA, MSG_VIEW_ALL_PROJECTS, MSG_CHANGE_FOCUS_CTA } from '../utils/dictionary';

import { Dropdownizer } from 'codethings-react-ui';

import { useFocusFilter } from '../utils/useFocusFilter';

export function FocusFilterDropdown (): JSX.Element {

  const { 
    activeFocusType, 
    focusCategories, 
    updateFocus, 
    clearFocus 
  } = useFocusFilter();

  const hasOptionsWithNoActiveType = (!activeFocusType && focusCategories.length > 0);
  const hasOptionsWithActiveType = (!!activeFocusType && focusCategories.length > 1);
  const hasFocusOptions = hasOptionsWithNoActiveType || hasOptionsWithActiveType;

  return (
    <div className="focus-filter">
      {!!activeFocusType && (
        <>
          <span className="view-all link" onClick={() => clearFocus()}>
            {MSG_VIEW_ALL_PROJECTS}
          </span> 
          {hasFocusOptions && <span className="middot">&middot;</span>}
        </>
      )}

      {hasFocusOptions && (
        <Dropdownizer
          title={activeFocusType ? MSG_CHANGE_FOCUS_CTA : MSG_VIEW_FOCUS_CTA}
          content={focusCategories.map((category, index) => {
            return !!category ? (
              <div key={index} className="dropdown-item"
                data-is-active={activeFocusType === category.id}
                onClick={() => updateFocus(category.id)}>
                {category?.name}
              </div>
            ) : <></>;
          })} 
        />
      )}
      
      <style jsx>{`
        .focus-filter :global(> *) {
          display:inline-block; 
          padding-top:.5rem;
        }

        .view-all {
          padding-right:.5rem;
        }

        .focus-filter :global(> dl) {
          padding-left:.5rem;
        }

        .dropdown-item[data-is-active="true"] { 
          display:none; 
        }
      `}</style>
    </div>
  );
}
