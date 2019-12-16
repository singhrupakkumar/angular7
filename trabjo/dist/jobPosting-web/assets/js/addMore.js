window.onload = function() {
    $("#addfield").click(function () {
        var count = parseInt($(this).attr("data-count")) + 1;
        var html = '';
        html += '<div class="experience-repeater" id="experience-repeaterrow' + count + '" [formGroupName]="i">';
        html += '<div class="form-group">';
        html += '<input type="text" formControlName="position" class="form-control" placeholder="Position">';
        html += '</div>';
        html += '<div class="form-group">';
        html += '<input type="text" formControlName="companyName" class="form-control" placeholder="Position">';
        html += '</div>';
        html += '<div class="form-group">';
        html += '<p-calendar formControlName="startDate" class="form-control"></p-calendar>';
        html += '</div>';
        html += '<div class="form-group">';
        html += '<p-calendar formControlName="endDate" class="form-control"></p-calendar>';
        html += '</div>';
        html += '<div class="form-group">';
        html += '<textarea formControlName="description" class="form-control" placeholder="Description here">';
        html += '</textarea>';
        html += '</div>';
        html += '<div class="form-group removerepeater-btn">';
        html += '<button type="button" data-id="' + count + '" id="removefield" class="btn btn-primary btn-repeat">';
        html += '<i class="fa fa-minus-circle" aria-hidden="true">';
        html += '</i>';
        html += '</button>';
        html += '</div>';
        html += '</div>';
        $("#repeater-container").append(html);
        $(this).attr("data-count", parseInt(count));
    });

    $(document).delegate("#removefield", "click", function () {
        var id = $(this).attr("data-id");
        $('#experience-repeaterrow' + id).remove();

    });
};