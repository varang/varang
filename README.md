# VarAng UI Components

VarAng is a UI components library based on Angular 2. At the moment, an Ajax based data table (grid) is implemented.
Here is the syntax.

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


