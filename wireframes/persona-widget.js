(function () {
  'use strict';

  var cfg = window.PersonaAI || {};
  var apiKey = cfg.apiKey || '';
  var apiUrl = cfg.apiUrl || 'https://www.personaai.site/api/v1/chat';
  var language = cfg.language || 'az';
  var primaryColor = cfg.primaryColor || '#667EEA';
  var position = cfg.position || 'bottom-right';
  var title = cfg.title || 'SMB Köməkçi';
  var welcome = cfg.welcome || 'Salam! SMB ERP haqqında suallarınıza cavab verməyə hazıram.';

  if (!apiKey) {
    console.warn('[PersonaAI] apiKey is required for REST API chat.');
    return;
  }

  var storageKey = 'personaai_conversation';
  var conversationId = sessionStorage.getItem(storageKey) || '';

  var style = document.createElement('style');
  style.textContent = [
    '#personaai-root{position:fixed;z-index:2147483000;font-family:"DM Sans",system-ui,-apple-system,sans-serif}',
    '#personaai-root.bottom-right{bottom:24px;right:24px}',
    '#personaai-root.bottom-left{bottom:24px;left:24px}',
    '#personaai-launcher{width:56px;height:56px;border-radius:50%;border:none;cursor:pointer;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 28px rgba(0,0,0,.18);transition:transform .2s,box-shadow .2s}',
    '#personaai-launcher:hover{transform:scale(1.05);box-shadow:0 12px 32px rgba(0,0,0,.22)}',
    '#personaai-panel{display:none;width:min(380px,calc(100vw - 32px));height:min(520px,calc(100vh - 100px));background:#fff;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.18);overflow:hidden;flex-direction:column;margin-bottom:14px}',
    '#personaai-panel.open{display:flex}',
    '#personaai-header{padding:16px 18px;color:#fff;display:flex;align-items:center;justify-content:space-between;gap:12px}',
    '#personaai-header h3{margin:0;font-size:15px;font-weight:600}',
    '#personaai-header p{margin:2px 0 0;font-size:12px;opacity:.9}',
    '#personaai-close{background:rgba(255,255,255,.18);border:none;color:#fff;width:30px;height:30px;border-radius:8px;cursor:pointer;font-size:18px;line-height:1}',
    '#personaai-messages{flex:1;overflow-y:auto;padding:16px;background:#f7f9fc;display:flex;flex-direction:column;gap:10px}',
    '.personaai-msg{max-width:92%;padding:10px 12px;border-radius:12px;font-size:14px;line-height:1.5;word-break:break-word}',
    '.personaai-msg.user{align-self:flex-end;background:' + primaryColor + ';color:#fff;border-bottom-right-radius:4px}',
    '.personaai-msg.bot{align-self:flex-start;background:#fff;color:#1f2937;border:1px solid #e5e7eb;border-bottom-left-radius:4px}',
    '.personaai-msg.typing{opacity:.7;font-style:italic}',
    '.personaai-md p{margin:0 0 8px}',
    '.personaai-md p:last-child{margin-bottom:0}',
    '.personaai-md ul,.personaai-md ol{margin:6px 0 8px;padding-left:18px}',
    '.personaai-md li{margin:5px 0}',
    '.personaai-md li::marker{color:' + primaryColor + '}',
    '.personaai-md strong{font-weight:600;color:#111827}',
    '.personaai-md em{font-style:italic}',
    '.personaai-md h3,.personaai-md h4{margin:10px 0 6px;font-size:14px;font-weight:600;color:#111827}',
    '.personaai-md code{background:#f3f4f6;padding:1px 5px;border-radius:4px;font-size:12px;font-family:ui-monospace,monospace}',
    '#personaai-form{display:flex;gap:8px;padding:12px;border-top:1px solid #e5e7eb;background:#fff}',
    '#personaai-input{flex:1;border:1px solid #d1d5db;border-radius:10px;padding:10px 12px;font:inherit;font-size:14px;outline:none}',
    '#personaai-input:focus{border-color:' + primaryColor + ';box-shadow:0 0 0 3px ' + primaryColor + '22}',
    '#personaai-send{border:none;border-radius:10px;padding:0 14px;color:#fff;cursor:pointer;font:inherit;font-size:14px;font-weight:600}',
    '#personaai-send:disabled{opacity:.55;cursor:not-allowed}',
    '@media(max-width:480px){#personaai-root.bottom-right,#personaai-root.bottom-left{bottom:16px;right:16px;left:auto}#personaai-panel{width:calc(100vw - 32px);height:calc(100vh - 96px)}}'
  ].join('');
  document.head.appendChild(style);

  var root = document.createElement('div');
  root.id = 'personaai-root';
  root.className = position.indexOf('left') >= 0 ? 'bottom-left' : 'bottom-right';
  root.innerHTML =
    '<div id="personaai-panel" role="dialog" aria-label="' + title + '">' +
      '<div id="personaai-header" style="background:' + primaryColor + '">' +
        '<div><h3>' + title + '</h3><p>Onlayn</p></div>' +
        '<button id="personaai-close" type="button" aria-label="Bağla">×</button>' +
      '</div>' +
      '<div id="personaai-messages"></div>' +
      '<form id="personaai-form">' +
        '<input id="personaai-input" type="text" placeholder="Mesajınızı yazın..." autocomplete="off" maxlength="2000" />' +
        '<button id="personaai-send" type="submit" style="background:' + primaryColor + '">Göndər</button>' +
      '</form>' +
    '</div>' +
    '<button id="personaai-launcher" type="button" aria-label="Çatı aç" style="background:' + primaryColor + '">' +
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>' +
      '</svg>' +
    '</button>';
  document.body.appendChild(root);

  var panel = document.getElementById('personaai-panel');
  var launcher = document.getElementById('personaai-launcher');
  var closeBtn = document.getElementById('personaai-close');
  var messagesEl = document.getElementById('personaai-messages');
  var form = document.getElementById('personaai-form');
  var input = document.getElementById('personaai-input');
  var sendBtn = document.getElementById('personaai-send');
  var isOpen = false;
  var isSending = false;
  var greeted = false;

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function inlineMarkdown(text) {
    var s = escapeHtml(text);
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/__(.+?)__/g, '<strong>$1</strong>');
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
    return s;
  }

  function normalizeMarkdown(text) {
    return String(text)
      .replace(/\r\n/g, '\n')
      .replace(/\s+\*\s+(?=\*\*)/g, '\n* ');
  }

  function renderMarkdown(text) {
    var lines = normalizeMarkdown(text).split('\n');
    var html = [];
    var inList = false;
    var listType = null;

    function closeList() {
      if (inList) {
        html.push(listType === 'ol' ? '</ol>' : '</ul>');
        inList = false;
        listType = null;
      }
    }

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) {
        closeList();
        continue;
      }

      var h3 = line.match(/^###\s+(.+)$/);
      var h2 = line.match(/^##\s+(.+)$/);
      var ul = line.match(/^[\*\-•]\s+(.+)$/);
      var ol = line.match(/^\d+\.\s+(.+)$/);

      if (h3) {
        closeList();
        html.push('<h4>' + inlineMarkdown(h3[1]) + '</h4>');
      } else if (h2) {
        closeList();
        html.push('<h3>' + inlineMarkdown(h2[1]) + '</h3>');
      } else if (ul) {
        if (!inList || listType !== 'ul') {
          closeList();
          html.push('<ul>');
          inList = true;
          listType = 'ul';
        }
        html.push('<li>' + inlineMarkdown(ul[1]) + '</li>');
      } else if (ol) {
        if (!inList || listType !== 'ol') {
          closeList();
          html.push('<ol>');
          inList = true;
          listType = 'ol';
        }
        html.push('<li>' + inlineMarkdown(ol[1]) + '</li>');
      } else {
        closeList();
        html.push('<p>' + inlineMarkdown(line) + '</p>');
      }
    }

    closeList();
    return '<div class="personaai-md">' + html.join('') + '</div>';
  }

  function setMessageContent(el, text, role) {
    if (role === 'bot' && !el.classList.contains('typing')) {
      el.innerHTML = renderMarkdown(text);
    } else {
      el.textContent = text;
    }
  }

  function addMessage(text, role) {
    var el = document.createElement('div');
    el.className = 'personaai-msg ' + role;
    setMessageContent(el, text, role);
    messagesEl.appendChild(el);
    scrollToBottom();
    return el;
  }

  function extractReply(data) {
    if (!data) return '';
    if (typeof data === 'string') return data;
    return (
      data.response ||
      data.reply ||
      data.message ||
      data.content ||
      data.text ||
      (data.data && (data.data.response || data.data.reply || data.data.message)) ||
      ''
    );
  }

  function setOpen(open) {
    isOpen = open;
    panel.classList.toggle('open', open);
    if (open && !greeted) {
      greeted = true;
      addMessage(welcome, 'bot');
    }
    if (open) {
      setTimeout(function () { input.focus(); }, 120);
    }
  }

  function setSending(sending) {
    isSending = sending;
    sendBtn.disabled = sending;
    input.disabled = sending;
  }

  async function sendMessage(text) {
    var trimmed = (text || '').trim();
    if (!trimmed || isSending) return;

    addMessage(trimmed, 'user');
    input.value = '';
    setSending(true);
    var typingEl = addMessage('Yazır...', 'bot typing');

    try {
      var payload = {
        message: trimmed,
        language: language
      };
      if (conversationId) payload.conversation_id = conversationId;

      var response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + apiKey
        },
        body: JSON.stringify(payload)
      });

      var raw = await response.text();
      var data;
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch (e) {
        data = { reply: raw };
      }

      if (!response.ok) {
        var errMsg =
          (data.error && (data.error.message || data.error)) ||
          data.message ||
          (data.data && data.data.response) ||
          'Server xətası (' + response.status + ')';
        throw new Error(typeof errMsg === 'string' ? errMsg : 'Server xətası');
      }

      if (data.data && data.data.conversation_id) {
        conversationId = data.data.conversation_id;
        sessionStorage.setItem(storageKey, conversationId);
      }

      var reply = extractReply(data);
      if (!reply) reply = 'Cavab alınmadı. Yenidən cəhd edin.';
      typingEl.classList.remove('typing');
      setMessageContent(typingEl, reply, 'bot');
    } catch (error) {
      typingEl.classList.remove('typing');
      typingEl.textContent = error && error.message ? error.message : 'Bağlantı xətası. Yenidən cəhd edin.';
    } finally {
      setSending(false);
      scrollToBottom();
    }
  }

  launcher.addEventListener('click', function () { setOpen(!isOpen); });
  closeBtn.addEventListener('click', function () { setOpen(false); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    sendMessage(input.value);
  });
})();
