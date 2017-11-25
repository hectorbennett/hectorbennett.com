$(document).ready(function () {
    var form_count = Number($("[name=form-TOTAL_FORMS]").val());
    // get extra form count so we know what index to use for the next item.

    $("#add-another").click(function () {
        form_count++;
        $("#santa-forms").append($("#empty_form").html().replace(/__prefix__/g, form_count - 1));
        $("#id_form-TOTAL_FORMS").val(parseInt(form_count));
    });

    $("body").off("click").on("click", ".delete", function () {
        form_count--;
        $(this).closest(".card").remove();
        $("#id_form-TOTAL_FORMS").val(parseInt(form_count));
    });
});
$;
