##0210 VarGrid 
<div id='0210-VarGrid'/>

VarGrid is a datatable that supports the functionalities below at the moment (v0.2.6). There is a VarGrid show case that is integrated with Spring Data Rest in [this](https://github.com/varang/varang-test) address. 

VarGrid has a syntax below.


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

There are four configuration sections: VarGridDataSource, VarGridRemoteDataProviderMapping, VarGridClientPagerParams, VarGridRow having the explanation below.

| Tag Name       	| Explanation|
|-----------------|------------|
| __VarGridDataSource__ | The datasource integration is done in this section. The attribute __dataOrigin__ defines the location of the datasource. The string __local__ indicates that the data source in client side and the string __remote__ indicates that the data source in server side. When the __dataOrigin__ is defined as _remote_, there should be a JSON hash table in the child content of VarGridDataSource and the hash table should contain a (key, value) pair where the key should have __url__ and its counter value that indicates the remote data source URL serving paginated data source.|
| __VarGridRemoteDataProviderMapping__     | This section defines the server side integration parameters. The content of this section should be JSON hash map and have __in__ and __out__ parameters defined. The parameters  of __in__ define the structure of remote data that is being paginated. The parameters "out" defines the query parameters that are subject to be send to the server. The configuration parameters __in__ and __out__ helps front-end developer  have a free data structure in server side regarding the pagination mechanism.     |
| __VarGridClientPagerParams__ | This section is solely defines the the cilent side parameters. It differs from __out__ parameter of __VarGridRemoteDataProviderMapping__ in such a way that it does not responsible from integration but the representation of the data in client side.      |
|__VarGridRow__| This section defines the column model of VarGrid. Each VarGridColumn inside VarGridRow should define __label__ and __name__ attributes that should match the server side's data array's column naming policy. The column labeled __checkbox__ enables the __VarGrid__ have a checkboxed column. The order of checkboxed column can be changed among the column definitions that are defined by __VarGridColumn__. Accordingly, the place of the checboxed column will change.|

The configuration above results in a display below if the server side is properly configured. There is a server side paginated data implementation which is developed by Spring Boot in [this](https://github.com/varang/varang-test) address. 

![Basic apperance of VarGrid-v025] (https://raw.githubusercontent.com/varang/varang/master/docs/githubpages/images/vargrid-v025-output.png "Var Grid v0.2.5 output screenshot")

For the Spring Boot implementation that is provided in  [this](https://github.com/varang/varang-test) address, the rest api provided by __http://localhost:8080/ebys/datarest/persons__ produces json structure below.

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
and VarGrid becomes aware of the json structure with the configuration below. VarGrid consumes the \"_embedded.persons\" JSON list provided above by having the configuration \"list\": \"_embedded.persons\".

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


### Features

VarGrid-v0.2.5 supports

1. Bootstap css framework.
2. Configurable GET and POST methods
3. Local (static) and remote (REST) data sources.
4. Ajax based pagination
5. Different varying data structure. One can adapt the data structure mapping by configuration parameters. 
6. Sorting
7. Spring Data Rest integration
8. Checkboxed rows
9. Event handlings: onComplete, onRequest, onRowInserting, onRowSelect, onDoubleClick, onSorting, onPaging


###Events

VarGrid supports events below.

1. onComplete
2. onRequest
3. onRowInserting
4. onRowSelect
5. onDoubleClick
6. onSorting
7. onPaging

All events are subscribed in the tag __<VarGrid>__ and have two phases:before and after. You can see an example [here](#0210-event-interceptor-example).

The type of the events is __VarGridEvent__ that has definition below.

```javascript
export enum VarangInterceptor {Before=0, After=1}

export class VarangEvent {
    source:any;
    target:any;
    value:any;    
    intercept:VarangInterceptor=VarangInterceptor.Before; //before, after

    constructor(s:any,t:any,v:any,i:VarangInterceptor){
      this.source = s;
      this.target = t;
      this.value = v;
      this.intercept = i;
   }   

}

export class VarGridEvent extends VarangEvent {
  constructor(s:any,t:any,v:any,i:VarangInterceptor){
    super(s,t,v,i);
   } 
}   
```

<div id="0210-event-interceptor-example"/>
### Event Subscription Example

Here is an example that sets an event while paging.

Paging callback function should be registered in VarGrid tag as shown below.

```javascript
<VarGrid (onPaging)="onGridPaging($event)">
...!configuration parameters!...
</VarGrid>
```

The call back function _onGridPaging_ should have implementation below.

```javascript
onGridPaging(event:VarGridEvent) {
	if (event.intercept = VarangInterceptor.Before){
		alert("before paging");
	} else if (event.intercept = VarangInterceptor.After) {
		alert("after paging");
	}
}
```

The input parameter of the ongGrdPaging function should be in the VarGridEvent type. To handle different phases of the event, for example before paging or after paging, _event.interceptor_ value should be checked as in the example above.



### Next to do

VarGrid is still in development. The features below are intented to be developed. The next fetaure to be added is _Changeable column orders_

1. Changeable column orders
2. Column grouping
3. Search dialog
4. Search toolbar
5. Footer buttons
6. Pdf and excel export drivers.
7. Button cells
8. Subgrid
9. UI enhancement
10. Adaptable css templates
11. Editable row
