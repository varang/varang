# VarAng UI Components

VarAng is a UI components library based on Angular 2. At the moment VarGrid (data table) is implemented. You can see the npm package from [here](https://www.npmjs.com/package/varang) and source code from [here](https://github.com/varang/varang). There is a Spring Data Rest implementation in [this](https://github.com/varang/varang) address. Here is the syntax.

```html
<VarGrid>
	<VarGridDataSource methodType="POST" dataOrigin="remote" 
		loadOnInit="true"  url="url" serverType="rest">
		{
		"url":"http://localhost:8080/ebys/datarest/persons"
		}
	</VarGridDataSource>
	
	<VarGridRemoteDataProviderMapping>
		{
		    "in":{
			    "jsonXPath":
			    	{
				    	"list": "_embedded.persons",
				    	"pageSize": "page.size",
				    	"pageIndex": "page.number",
				    	"total": "page.totalElements"
			    	}
		    },
		    "out":{
		    	"pageStart": "page",
		    	"pageSize": "rows",
		    	"sortIndex":"sidx",
		    	"sortOrder": "sord"
		    }
		}
	</VarGridRemoteDataProviderMapping>			

	<VarGridClientPagerParams>
		{
		    "id":"id",
		    "sortIndex": "id",
		    "pageSize": 10,
		    "pageSizes": [10,30,50],
		    "sortOrder": "ASC",
		    "pageStart": 0
		}
	</VarGridClientPagerParams>	

	<VarGridRow>
		<VarGridColumn label="checkbox"  styleClass="grid_checkbox" type="checkbox"></VarGridColumn>
		<VarGridColumn label="id" name="id" styleClass="grid_id" ></VarGridColumn>
		<VarGridColumn label="name" name="name" styleClass="grid_name" ></VarGridColumn>
		<VarGridColumn label="firstName" name="firstName" styleClass="grid_firstName" ></VarGridColumn>
	</VarGridRow>

</VarGrid>
```

and this is the output.

![Basic apperance of VarGrid-v022] (https://raw.githubusercontent.com/varang/varang/master/docs/githubpages/images/vargrid-v0.2.2-output.png "Var Grid v0.2.2 output screenshot")

For the example above, the rest api provided by "http://localhost:8080/ebys/datarest/persons" produces json structure below.

```javascript
{
  "_embedded" : {
    "persons" : [ {
      "id" : 1,
      "code" : null,
      "aciklama" : null,
      "active" : true,
      "version" : null,
      "md5" : null,
      "createTime" : "2016-06-05T13:24:36.827+0000",
      "updateTime" : "2016-06-05T13:24:36.827+0000",
      "firstName" : "person 0",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/ebys/datarest/persons/1"
        },
        "person" : {
          "href" : "http://localhost:8080/ebys/datarest/persons/1{?projection}",
          "templated" : true
        }
      }
    }, {
      "id" : 2,
      "code" : null,
      "aciklama" : null,
      "active" : true,
      "version" : null,
      "md5" : null,
      "createTime" : "2016-06-05T13:24:36.867+0000",
      "updateTime" : "2016-06-05T13:24:36.867+0000",
      "firstName" : "person 1",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/ebys/datarest/persons/2"
        },
        "person" : {
          "href" : "http://localhost:8080/ebys/datarest/persons/2{?projection}",
          "templated" : true
        }
      }
    },
    ]
  },
  "_links" : {
    "first" : {
      "href" : "http://localhost:8080/ebys/datarest/persons?page=0&rows=10"
    },
    "self" : {
      "href" : "http://localhost:8080/ebys/datarest/persons"
    },
    "next" : {
      "href" : "http://localhost:8080/ebys/datarest/persons?page=1&rows=10"
    },
    "last" : {
      "href" : "http://localhost:8080/ebys/datarest/persons?page=46&rows=10"
    },
    "profile" : {
      "href" : "http://localhost:8080/ebys/datarest/profile/persons"
    }
  },
  "page" : {
    "size" : 10,
    "totalElements" : 461,
    "totalPages" : 47,
    "number" : 0
  }
}

```
and VarGrid becomes aware of the json structure with the configuration below. VarGrid consumes the "_embedded.persons" JSON list provided above by having the configuration "list": "_embedded.persons".

```html
	<VarGridRemoteDataProviderMapping>
		{
		    "in":{
			    "jsonXPath":
			    	{
				    	"list": "_embedded.persons",
				    	"pageSize": "page.size",
				    	"pageIndex": "page.number",
				    	"total": "page.totalElements"
			    	}
		    },
		    "out":{
		    	"pageStart": "page",
		    	"pageSize": "rows",
		    	"sortIndex":"sidx",
		    	"sortOrder": "sord"
		    }
		}
	</VarGridRemoteDataProviderMapping>			
```


### VarGrid-v0.2.0 has the functionalities below.

VarGrid;

1. is built on bootstap css framework.
2. supports configurable GET and POST methods
3. supports local (static) and remote (ajax) data sources.
4. supports ajax based pagination
5. is configurable for different json formats of varying data source. 
6. Sorting
7. Spring Data Rest integration
8. Checkboxed rows


### Next to do

1. Event handlings: onComplete, onBeforeRequest, onAfterRequest, onBeforeRowInserting, onAfterRowInserting, onRowSelect, on CellSelect, onDoubleClick, onBeforeSorting, onAfterSorting, onBeforePaging, onAfterPaging.
2. Search dialog
3. Search toolbar
4. Drag and drop columns
5. Footer buttons
6. Pdf and excel export drivers.
7. Column grouping
8. Button cells
9. Subgrid
10. UI enhancement
11. Adaptable css templates
12. Editable row
