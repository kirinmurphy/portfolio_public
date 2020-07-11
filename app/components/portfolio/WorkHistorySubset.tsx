import { 
  MSG_WORK_HISTORY_TYPE, 
  MSG_SHOW_ALL_IN_LIST_TRIGGER 
} from '../utils/dictionary';

import { WorkType, ProjectSummaryProps } from '../types/project';

import '../utils/fontAwesomeLibrary';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ProjectList } from './ProjectList';

interface Props {
  workType: WorkType;
  projectList: ProjectSummaryProps[];
  activeCategory: string;
  maxProjectsOnInit: number | null;
  showAll: boolean;
  toggleShowAll: (arg0: boolean) => void;
};

export const WorkHistorySubset:React.FC<Props> = (props) => {
  const {
    workType,
    projectList,
    activeCategory,
    maxProjectsOnInit,
    showAll,
    toggleShowAll
  } = props;

  const filteredList = getSubset(projectList, workType);

  const displayShowAllTrigger = () => {
    const someProjectsHiddenOnInit = !!maxProjectsOnInit && filteredList.length > maxProjectsOnInit;
    return someProjectsHiddenOnInit && !showAll;  
  };

  const indexForHidingImages = !!maxProjectsOnInit ? maxProjectsOnInit+1 : 1000000;

  return (
    <div data-show-all={showAll}>
      <ProjectList
        title={MSG_WORK_HISTORY_TYPE[workType]} 
        projects={filteredList}
        activeCategory={activeCategory}
      />

      {displayShowAllTrigger() && (
        <div className="show-all" onClick={() => toggleShowAll(true)}>
          <span>
            {MSG_SHOW_ALL_IN_LIST_TRIGGER}
            <FontAwesomeIcon icon={['fas', 'chevron-circle-down']} />
          </span>
        </div>      
      )}

      <style jsx>{`
        .show-all {
          padding:.5rem 1rem;    
          text-align:right;
          cursor:pointer;
          background: var(--color-bluegray-light);
        }

        .show-all:hover {
          font-weight:bold;
          background: var(--color-bluegray-lighter);
        }

        .show-all :global(.svg-inline--fa) {
          color:var(--textcolor-light);
        }

        .show-all:hover :global(.svg-inline--fa) {
          color:var(--textcolor-base);
        }

        .show-all > span {
          font-size:var(--fontSize-bump);
        }

        .show-all > span :global(.svg-inline--fa) {
          width:var(--fontSize-bump);
          margin-left:.5rem;
          transform:translateY(.2rem);
        }

        @media screen {
          [data-show-all="false"] :global(article:nth-of-type(n+${indexForHidingImages})) { 
            display:none; 
          }
        }

        @media print {
          .show-all { display:none; }
        }
      `}</style>
    </div>
  );
}

function getSubset (
  projectList: ProjectSummaryProps[], 
  workType:string) {
  return projectList.filter(project => project.workType == workType);
};
