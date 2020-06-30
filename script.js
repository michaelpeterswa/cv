$(function () {
  var data = [{
      action: 'type',
      strings: ["npm install -g info^400"],
      output: '<span class="gray">+info@2.0.20 installed</span><br>&nbsp;',
      postDelay: 2500
    },
    {
      action: 'type',
      //clear: true,
      strings: ['info show data.toml^400'],
      output: $('.info-show-output').html()
    }

  ];
  runScripts(data, 0);
});

function runScripts(data, pos) {
  var prompt = $('.prompt'),
    script = data[pos];
  if (script.clear === true) {
    $('.history').html('');
  }
  switch (script.action) {
    case 'type':
      // cleanup for next execution
      prompt.removeData();
      $('.typed-cursor').text('');
      prompt.typed({
        strings: script.strings,
        typeSpeed: 30,
        callback: function () {
          var history = $('.history').html();
          history = history ? [history] : [];
          history.push('<span class="prompt_color"><b>λ </span>~</b> ' + prompt.text());
          if (script.output) {
            history.push(script.output);
            prompt.html('');
            $('.history').html(history.join('<br>'));
          }
          // scroll to bottom of screen
          $('section.terminal').scrollTop($('section.terminal').height());
          // Run next script
          pos++;
          if (pos < data.length) {
            setTimeout(function () {
              runScripts(data, pos);
            }, script.postDelay || 1000);
          }
        }
      });
      break;
    case 'view':

      break;
  }
}