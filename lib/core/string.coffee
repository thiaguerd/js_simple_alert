if !String::include
	String::include = ->
		'use strict'
		String::indexOf.apply(this, arguments) != -1