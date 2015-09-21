@.ba = () ->
	center = (h) ->
		$(h['modal']).css 'marginLeft', $(h['modal']).width() / 2 * -1 + 'px'
		$(h['modal']).css 'marginTop', $(h['modal']).height() / 2 * -1 + 'px'
		$(h['modal']).css 'top', '50%'
		$(h['modal']).css 'left', '50%'

	show_shadow = (h) ->
		$(h['shadow']).animate { opacity: '0.4' }, h['openTime'], ->
			$('body').css 'overflow', 'hidden'

	open_modal = (h) ->
		$(h['modal']).transition { scale: 0 }, 0
		$(h['modal']).transition { scale: 1 }, h['openTime'], h['effectShow']

	close_btn_bind = (h) ->
		$(h['bt_close']).click ->
			close_modal h
			if h['onClose']
				h['onClose']()
		if h['closeOnClickShadow']
			$(h['shadow']).click ->
				close_modal h
	
	resize_btns = (h) ->
		try
			close = $(h['bt_close']).outerWidth()
			confirm = $(h['bt_confirm']).outerWidth()
			if close > confirm
				$(h['bt_confirm']).css 'width', close
			else
				$(h['bt_close']).css 'width', confirm
		catch err

	gen_modal = (h) ->
		"""<div id="#{h['modal'].substring(1)}" class="ba_modal" ><div class="ba_modal_content" >"""

	gen_message = (h) ->
		if h['message'] then """<div class="ba_modal_message" >#{h['message']}</div>""" else ''
	
	gen_title = (h) ->
		if h['title'] then """<div class="ba_modal_title">#{h['title']}</div>""" else ''
	
	shadow = (h) ->
		"""<div id="#{h['shadow'].substring(1)}" class="ba_shadow"></div>"""
	
	close_modal = (h) ->
		console.log("chamou a porra do modal  h['closeTime']: "+ h['closeTime'])
		$(h['modal']).transition { scale: 0, opacity: 0 }, h['closeTime'], h['effectHide'], ->
			$(this).remove()

		$(h['shadow']).transition { opacity: 0 }, h['closeTime'], ->
			$(this).remove()
			if !(h['onClose'] + '').include('ba') or !(h['onConfirm'] + '').include('ba')
				$('body').css 'overflow', 'auto'

	
	bt_confirm = (h) ->
		if h['showConfirmBtn'] then """
			<div id="#{h['div_bt_confirm'].substring(1)}" class="ba_modal_bt">
				<button id="#{h['bt_confirm'].substring(1)}" class="#{h['confirmClass']}">#{h['confirmText']}</button>
			</div>
		""" else ''
	
	bt_close = (h) ->
		"""
			<div id="#{h['div_bt_close'].substring(1)}" class="ba_modal_bt">
				<button id="#{h['bt_close'].substring(1)}" class="#{h['closeClass']}">#{h['closeText']}</button>
			</div>
		"""
	
	process_hash = (params) ->
		if params[0].constructor == Object
			hash = params[0]
		else 
			hash = {}
			switch params.length
				when 1
					hash['message'] = params[0]
				when 2
					hash['title'] = params[0]
					hash['message'] = params[1]
		r = {}
		r['title']				= if hash['title'] != undefined					then hash['title']				else false
		r['message']			= if hash['message'] != undefined				then hash['message']			else false
		r['showConfirmBtn']		= if hash['showConfirmBtn'] != undefined		then true						else if (hash['onConfirm'] != undefined) || (hash['confirmClass'] != undefined || hash['confirmText'] != undefined) then true else false
		r['showCloseBtn']		= if hash['showCloseBtn'] != undefined			then true 						else false
		r['confirmText']		= if hash['confirmText'] != undefined			then hash['confirmText']		else 'Confirm'
		r['confirmClass']		= if hash['confirmClass'] != undefined			then hash['confirmClass']		else 'btn btn-success'
		r['closeText']			= if hash['closeText'] != undefined				then hash['closeText']			else 'Close'
		r['closeClass']			= if hash['closeClass'] != undefined			then hash['closeClass']			else ''
		r['onConfirm']			= if hash['onConfirm'] != undefined				then hash['onConfirm']			else false
		r['onClose']			= if hash['onClose'] != undefined				then hash['onClose']			else false
		r['message']			= if hash['message'] != undefined				then hash['message']			else ''
		r['openTime']			= if hash['time'] != undefined					then hash['time']				else if hash['openTime'] != undefined then hash['openTime'] else 250
		r['closeTime']			= if hash['time'] != undefined					then hash['time']				else if hash['closeTime'] != undefined then hash['closeTime'] else 250
		r['effectShow']			= if hash['effectShow'] != undefined			then hash['effectShow']			else if hash['effect'] then hash['effect'] else 'easeInOutBack'
		r['effectHide']			= if hash['effectHide'] != undefined			then hash['effectHide']			else if hash['effect'] then hash['effect'] else 'easeInBack'
		r['closeOnClickShadow']	= if hash['closeOnClickShadow'] != undefined	then hash['closeOnClickShadow']	else false
		r['id']					= if hash['id'] then hash['id'] else generate_random_id()
		r['modal']				= '#modal_' + r['id']
		r['shadow']				= '#shadow_' + r['id']
		r['bt_close']			= '#bt_close_' + r['id']
		r['div_bt_close']		= '#div_bt_close_' + r['id']
		r['bt_confirm']			= '#bt_confirm_' + r['id']
		r['div_bt_confirm']		= '#div_bt_confirm_' + r['id']
		r

	generate_random_id = ->
		rr = (Math.random() + '').substring(2)
		while $('#shadow_' + rr).size() > 0
			rr = (Math.random() + '').substring(2)
		rr

	h = process_hash(arguments)
	modal = gen_modal(h)
	modal += gen_title(h)
	modal += gen_message(h)
	modal += '<div class="ba_list_bt" >'
	modal += bt_close(h)
	modal += bt_confirm(h)
	modal += '</div>'
	modal += '</div></div>'
	$('body').append shadow(h)
	$('body').append modal
	$('body').css 'overflow', 'hidden'
	resize_btns h
	show_shadow h
	open_modal h
	close_btn_bind h
	if h['showConfirmBtn']
		$(h['bt_close']).addClass 'btfr'
		$(h['bt_confirm']).addClass 'btfl'
		$(h['bt_confirm']).click ->
			close_modal h
			if h['onConfirm']
				h['onConfirm']()
	else
		$(h['div_bt_close']).css 'width', '100%'
	center h
	$(window).resize ->
		center h
	return