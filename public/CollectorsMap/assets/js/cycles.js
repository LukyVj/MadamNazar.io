var Cycles = {
    data: [],
    load: function () {
        $.getJSON('https://jeanropke.github.io/RDR2CollectorsMap/data/cycles.json?nocache=' + nocache)
            .done(function (_data) {
                Cycles.data = _data;
                Cycles.setCycles();

                $('.cycle-data').text(Cycles.data.updated_at);
            });
        console.log('cycles loaded');
    },
    setCycles: function () {
        $.each(Cycles.data.cycles[Cycles.data.current], function (key, value) {
            $(`input[name=${key}]`).val(value);
        });
    }
}
