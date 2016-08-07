# simple_alert

simple alert js

[demo](https://dev.thiago.pro/simple-alert)

Dependencies
------------
- [js string include](https://dev.thiago.pro/js-string-include)
- [element queries](https://github.com/marcj/css-element-queries)
- [transit](http://ricostacruz.com/jquery.transit/)
- [topzindex](https://code.google.com/p/topzindex/)

Instalation
-----------

```html
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<link rel="stylesheet" href="dist/css/ba.css"></link>
<script type="text/javascript" src="lib/core/string.js"></script>
<script type="text/javascript" src="lib/event_resize/ElementQueries.js"></script>
<script type="text/javascript" src="lib/event_resize/ResizeSensor.js"></script>
<script type="text/javascript" src="lib/transit/transit.js"></script>
<script type="text/javascript" src="dist/js/ba.js"></script>
<script type="text/javascript" src="../lib/top_z_index/topZIndex.min.js"></script>
```

Examples
--------
The basic:

```javascript
ba("This is a message!")
```
Call alert with title and message:

```javascript
ba("Hello!","This is a message!")
```
Callbacks functions:

```javascript
ba({
	title: "You are sure?",
	message: "You want delete this post?",
	onConfirm: function(){
		ba("Your post has been deleted.")
	},
	onClose: function(){
		ba("Your post is safe :)")
	}
})
```

Add class to butons:

```javascript
ba({
	message: "Adding css class to butons",
	closeClass: "btn_blue",
	confirmClass: "btn_red"
})
```

Change text from buttons

```javascript
ba({
	message: "Custom text",
	confirmText: "don't confirm that!",
	closeText: "close is safe"
})
```

Click on shadow to close alert

```javascript
ba({
	message: "Click on shadow to close",
	closeOnClickShadow: true
})
```

Set default class to close and confirm buttons

```javascript
SimpleAlert.bt_confirm_class = "btn btn-success"
SimpleAlert.bt_close_class   = "btn btn-default"
```
