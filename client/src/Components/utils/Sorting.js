export function nameSortAsc(dataSource){
        dataSource.sort(function(a, b){
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        })
      }

export function nameSortDesc(dataSource){
        dataSource.sort(function(a, b){
          if(a.name < b.name) { return 1; }
          if(a.name > b.name) { return -1; }
          return 0;
        })
      }

export function salarySortAsc(dataSource){
        dataSource.sort(function(a, b) {
          return a.salary.localeCompare(b.salary, undefined, {
            numeric: true,
            sensitivity: 'base'
          });
        });
      }

export function salarySortDesc(dataSource){

  dataSource.sort(function(a, b) {
    return b.salary.localeCompare(a.salary, undefined, {
      numeric: true,
      sensitivity: 'base'
    });
  });
  }

export function departmentSortAsc(dataSource){
        dataSource.sort(function(a, b){
          if(a.department < b.department) { return -1; }
          if(a.department > b.department) { return 1; }
          return 0;
        })
      }

export function departmentSortDesc(dataSource){
        dataSource.sort(function(a, b){
          if(a.department < b.department) { return 1; }
          if(a.department > b.department) { return -1; }
          return 0;
        })
      }