# VarAng UI Components

VarAng is a UI components library based on Angular 2. At the moment VarGrid (data table) is implemented. You can see the npm package from [here](https://www.npmjs.com/package/varang). Here is the syntax.

```html
<VarGrid>
	<VarGridDataSource [methodType]="POST" [dataOrigin]="remote" 
		[loadOnInit]="true"  [url]="url" [serverType]="rest">
		{
		"url":"http://localhost:8080/ebys/datarest/persons"
		}
	</VarGridDataSource>
	
	<VarGridRemotePagerParams>
		{
		    "root": "rows",
		    "page": "page",
		    "total": "total",
		    "records": "records",
		    "repeatitems": false,
		    "cell": "cell",
		    "id": "id"
		}
	</VarGridRemotePagerParams>		

	<VarGridClientPagerParams>
		{
		    "sidx": "id",
		    "pageSize": 10,
		    "pageSizes": [10,30,50],
		    "sord": "ASC",
		    "pageStart": 0
		}
	</VarGridClientPagerParams>	

	<VarGridRow>
		<VarGridColumn label="id" name="id" styleClass="grid_id" ></VarGridColumn>
		<VarGridColumn label="name" name="name" styleClass="grid_name" ></VarGridColumn>
		<VarGridColumn label="firstName" name="firstName" styleClass="grid_firstName" ></VarGridColumn>
	</VarGridRow>

</VarGrid>
```

and this is the output.

![Basic apperance of VarGrid-v008] (https://raw.githubusercontent.com/varang/varang/master/docs/githubpages/images/vargrid-v008-output.png "Var Grid v008 output screenshot")

### VarGrid-v008 has the functionalities below.

VarGrid

1. is built on Semantic-ui css framework.
2. Supports configurable GET and POST methods
3. Supports local (static) and remote (ajax) data sources.
4. Supports ajax based pagination
5. is configurable for different json formats of varying data source. 

### Next to do

1. Headers will be implemented.
2. Sorting
3. Page size combobox.
4. Checkboxed rows
5. Event handlings: onComplete, onBeforeRequest, onAfterRequest, onBeforeRowInserting, onAfterRowInserting, onRowSelect, on CellSelect, onDoubleClick, onBeforeSorting, onAfterSorting, onBeforePaging, onAfterPaging.
