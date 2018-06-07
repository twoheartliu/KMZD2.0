$.fn.RangeSlider = function(cfg){
    this.sliderCfg = {
        min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null,
        max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
        step: cfg && Number(cfg.step) ? cfg.step : 0,
        callback: cfg && cfg.callback ? cfg.callback : null
    };
    var $input = $(this);
    var min = this.sliderCfg.min;
    var max = this.sliderCfg.max;
    var step = this.sliderCfg.step;
    var callback = this.sliderCfg.callback;
    $input.attr('min', min)
        .attr('max', 98)
        .attr('step', 0);
    $input.bind("input", function(e){
      var ttt = this.value;
        $input.attr('value', ttt);
        $input.css( 'background', 'linear-gradient(to right, #f2f2f2 ' + this.value + '%, #89211b 0,#89211b)' );
        if ($.isFunction(callback)) {
            callback(this);
        }
    });
};
