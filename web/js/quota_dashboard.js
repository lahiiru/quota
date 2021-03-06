/**
 * Created by Lahiru on 02/01/2016.
 */
$(document).ready(function(){
    // EVENT LISTENERS BELOW
    $('#reveal').change(
        function(){
            if ($(this).is(':checked')) {
                $('#inputPassword3').attr('type','text')
            }else{
                $('#inputPassword3').attr('type','password')
            }
        });

    $('.request-new-grant').click(
        function() {
            processNewUserAction(1, this)
        }
    );

    $('.request-new-reject').click(
        function() {
            processNewUserAction(0, this)
        }
    );

    $('.request-msg-remove').click(
        function() {
            processNewUserAction(0, this)
        }
    );

    $('.package-submit').click(
        function() {
            packageSubmit(this)
        }
    );

    $('.package-reset').click(
        function() {
            packageReset(this)
        }
    );

    $('#form_kbytes').wrap('<div id="kbytes" class="input-group"></div>');
    $('#form_kbytes').parent().prepend('<span class="input-group-addon" id="basic-addon2">0.00 GB</span>');
    $('#form_kbytes').change(
        function() {
            $('#basic-addon2').text($('#form_kbytes').val()/1000000.0+' GB');
        }
    );

});


// DEFINITIONS BELOW
function checkTotal() {
    var t = 0;
    $('.quota_slider').each(
        function (i, obj) {
            var v = $(obj).data("ionRangeSlider").result.from_value;
            t += v
        }
    );
    var p = t / $("#totalQuota").attr('value');
    $('.quota_total').attr('style', 'width: ' + p * 100 + '%');
    if (p > 1) {
        $('#shared')[0].innerHTML = "Invalid amount of"
        $('.package-submit').attr('disabled','disabled');
    } else {
        $('#shared')[0].innerHTML = t;
        $('.package-submit').removeAttr('disabled');
    }
}

function checkFreeze(){
    var t=0;
    $('.quota_slider').each(
        function(i,obj){
            var v=$(obj).data("ionRangeSlider").result.from_value;
            t+=v
        }
    );
    var p=t/$("#totalQuota").attr('value');
    if(p>1){
        var j=this.max_postfix.split('-')[1];
        var a=$('#range_'+j).data("ionRangeSlider");

        $('.modal-body')[0].innerHTML="<p>You can't exceed total of "+$("#totalQuota").val()+" GB.</p>";
        $('#package-info').modal('toggle');
        a.reset();
        document.x=a;
    }
}

function processNewUserAction(accept,context){
    var requestID = $(context).closest("td").siblings()[0].innerHTML;
    document.lastRow=$(context).closest("tr");
    $url="requests/reject";
    if(accept==1){
        $url="requests/accept";
    }
    function posted(data){
        $('.modal-body')[0].innerHTML="<p>"+data+"</p>";
        if(data.indexOf('Unknown') == -1){
            $('#request-info').modal('toggle');
        }
        if(!/error/i.test(data)) {
            $(document.lastRow).remove();
        }
    }
    $.ajax({
        type: "POST",
        url: $url,
        data: {"id":requestID},
        success: posted,
        dataType: "html"
    });
}

function packageSubmit(context){
    var json="[";
    $('.quota_slider').each(
        function(i,obj){
            var sid=$(obj).attr('sid');
            var pkg=$(obj).data("ionRangeSlider").result.from_value;
            if(i!=0){json+=","}
            json+='{"sid":"'+sid+'","package":"'+pkg+'"}';
        })
    json+="]";
    $('.package-submit').text('Processing...');
    $('.package-submit').attr('disabled','disabled');
    $.ajax({
        type: "POST",
        url: "package/change",
        data: {"data":json},
        success: packageCallback,
        dataType: "html"
    });
    function packageCallback(data){
        $('.modal-body')[0].innerHTML="<p>"+data+"</p>";
        $('#package-info').modal('toggle');
        $('.package-submit').removeAttr('disabled');
        $('.package-submit').text('Save changes');
        $('#package-info').on('hidden.bs.modal', function (e) {
            //document.location.reload();
        });

    }
}

function packageReset(context){
    $('.quota_slider').each(
        function(i,obj)
        {
            $(obj).data("ionRangeSlider").reset();
        }
    )
}