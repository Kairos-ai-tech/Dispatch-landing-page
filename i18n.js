(() => {
  const LANGS = ["zh-TW", "es", "ja", "ko"];
  const FONTS = {
    "zh-TW": "Noto+Serif+TC:wght@500&family=Noto+Sans+TC:wght@400;500;600",
    ja: "Noto+Serif+JP:wght@500&family=Noto+Sans+JP:wght@400;500;600",
    ko: "Noto+Serif+KR:wght@500&family=Noto+Sans+KR:wght@400;500;600",
  };

  const T = {
    "nav.how": ["運作方式", "Cómo funciona", "仕組み", "작동 방식"],
    "nav.auto": ["自動化", "Automatización", "自動化", "자동화"],
    "nav.price": ["方案價格", "Precios", "料金", "요금"],
    "nav.signin": ["登入", "Iniciar sesión", "ログイン", "로그인"],
    "nav.start": ["免費開始", "Empieza gratis", "無料で始める", "무료로 시작"],

    "hero.eyebrow": [
      "從你自己的 Gmail 發出的開發信",
      "Prospección en frío, desde tu propio Gmail",
      "あなた自身の Gmail から送るコールドアウトリーチ",
      "내 Gmail에서 직접 보내는 콜드 아웃리치",
    ],
    "hero.h1": [
      "讓每封開發信，讀起來都像<em>你</em>親手寫的。",
      "Cold email que sigue sonando a <em>ti</em>.",
      "コールドメールでも、<em>あなた</em>の言葉のまま。",
      "콜드 메일도, 여전히 <em>당신</em>다운 문장으로.",
    ],
    "hero.lede": [
      "寫一次、加入名單，Dispatch 就會從你的信箱一封一封寄出：控制節奏、追蹤成效，並持續跟進直到對方回覆。回信會進到你的收件匣，不是我們的。",
      "Escribe una vez, añade tu lista y Dispatch envía un mensaje a la vez desde tu dirección: con ritmo, con seguimiento y con recordatorios hasta que respondan. Las respuestas llegan a tu bandeja, no a la nuestra.",
      "一度書いて、リストを追加するだけ。Dispatch があなたのアドレスから1通ずつ、ペースを保って送信し、開封や返信を追跡し、返事が来るまでフォローアップします。返信は私たちではなく、あなたの受信トレイに届きます。",
      "한 번 작성하고 목록을 추가하면, Dispatch가 내 주소에서 한 통씩 일정한 간격으로 보내고, 추적하며, 답장이 올 때까지 후속 메일을 보냅니다. 답장은 우리가 아닌 내 받은편지함으로 들어옵니다.",
    ],
    "hero.cta2": ["看看如何運作", "Cómo funciona", "仕組みを見る", "작동 방식 보기"],
    "hero.fine": [
      "免費方案：每天 10 封，1 個信箱。",
      "Plan gratuito: 10 envíos al día, un buzón.",
      "無料プラン：1日10通、メールボックス1つ。",
      "무료 플랜: 하루 10통, 메일함 1개.",
    ],
    "legend.aria": ["進行中活動的示意圖", "Ilustración de una campaña en curso", "配信中のキャンペーンのイメージ", "진행 중인 캠페인 일러스트"],
    "legend.sent": ["已寄出", "Enviados", "送信", "발송"],
    "legend.open": ["已開啟", "Abiertos", "開封", "열람"],
    "legend.reply": ["已回覆", "Respondidos", "返信", "답장"],

    "how.h2": [
      "一次一封，像真人一樣寄出。",
      "Un mensaje, enviado como lo enviaría una persona.",
      "1通ずつ、人が送るのと同じやり方で。",
      "한 통씩, 사람이 보내는 방식 그대로.",
    ],
    "how.p": [
      "群發工具從它們的伺服器、共用的寄件信譽大量寄出。Dispatch 則透過你的 Gmail 一封一封寄，每封信都會留在你熟悉的「寄件備份」裡。",
      "Las herramientas masivas disparan desde sus servidores y con reputaciones compartidas. Dispatch sale por tu Gmail, de uno en uno, y cada correo queda en la carpeta Enviados que ya conoces.",
      "一括配信ツールは、自社サーバーと共有の送信評価から大量に送ります。Dispatch はあなたの Gmail から1通ずつ送るので、すべてのメールがいつもの「送信済み」フォルダに残ります。",
      "대량 발송 도구는 자체 서버와 공유 평판으로 한꺼번에 보냅니다. Dispatch는 내 Gmail로 한 통씩 보내므로 모든 메일이 익숙한 보낸편지함에 남습니다.",
    ],
    "s1.h": ["連結 Gmail", "Conecta Gmail", "Gmail を接続", "Gmail 연결"],
    "s1.p": [
      "授權一次即可。可選擇任何已驗證的「以別名寄信」地址作為寄件人。隨時可中斷連結，儲存的權杖也會一併撤銷。",
      "Aprueba una vez. Elige cualquier alias de envío verificado como remitente. Desconecta cuando quieras y el token guardado se revoca.",
      "一度承認するだけ。確認済みの「別名で送信」アドレスを送信元に選べます。いつでも接続を解除でき、保存されたトークンも取り消されます。",
      "한 번만 승인하면 됩니다. 확인된 '다른 주소로 보내기' 별칭을 발신자로 선택할 수 있습니다. 언제든 연결을 해제할 수 있으며 저장된 토큰은 폐기됩니다.",
    ],
    "s2.h": ["撰寫", "Redacta", "作成", "작성"],
    "s2.p": [
      "貼上電子郵件或上傳 CSV。使用 <code>{{firstName}}</code>、<code>{{company}}</code> 等合併欄位，加上簽名，最多排入四封跟進信。",
      "Pega correos o sube un CSV. Usa campos como <code>{{firstName}}</code> y <code>{{company}}</code>, añade una firma y programa hasta cuatro seguimientos.",
      "メールアドレスを貼り付けるか CSV をアップロード。<code>{{firstName}}</code> や <code>{{company}}</code> などの差し込みタグを使い、署名を追加し、最大4通のフォローアップを予約できます。",
      "이메일을 붙여 넣거나 CSV를 업로드하세요. <code>{{firstName}}</code>, <code>{{company}}</code> 같은 병합 태그를 쓰고, 서명을 추가하고, 후속 메일을 최대 4통까지 예약할 수 있습니다.",
    ],
    "s3.h": ["Dispatch 控制節奏", "Dispatch marca el ritmo", "Dispatch がペースを管理", "Dispatch가 속도를 조절"],
    "s3.p": [
      "每封間隔約一分鐘並設有每日上限，讓整個活動看起來像真人逐一處理名單，而不是瞬間爆量。",
      "Cerca de un minuto entre mensajes y un tope diario, para que la campaña parezca una persona recorriendo una lista, no una ráfaga.",
      "送信間隔は約1分、さらに1日の上限もあるため、キャンペーンは一斉送信ではなく、人がリストを順に進めているように見えます。",
      "메일 사이 간격은 약 1분이며 일일 한도가 있어, 캠페인이 한꺼번에 쏟아지는 발송이 아니라 사람이 목록을 차례로 처리하는 것처럼 보입니다.",
    ],
    "s4.h": ["跟進，然後停止", "Haz seguimiento y para", "フォローアップして、止まる", "후속 발송, 그리고 중단"],
    "s4.p": [
      "跟進信會以回覆形式寄到同一個對話串。對方一回覆或取消訂閱，該收件人的序列就會立即結束。",
      "Los seguimientos salen como respuestas en el mismo hilo. En cuanto alguien responde o se da de baja, su secuencia termina.",
      "フォローアップは同じスレッド内の返信として送られます。相手が返信するか配信停止した時点で、そのシーケンスは終了します。",
      "후속 메일은 같은 스레드에 답장으로 발송됩니다. 상대가 답장하거나 수신 거부하는 즉시 해당 시퀀스는 끝납니다.",
    ],

    "track.eyebrow": ["追蹤", "Seguimiento", "トラッキング", "추적"],
    "track.h2": ["查看每位收件人的歷程。", "Mira el recorrido de cada destinatario.", "受信者ごとの動きが見える。", "수신자별 여정을 한눈에."],
    "track.p": [
      "已寄出、已開啟、已點擊、已回覆、已取消訂閱。可暫停或繼續進行中的活動，並在報表中並排比較各個活動。",
      "Enviado, abierto, clic, respondido, baja. Pausa o reanuda una campaña en curso y compara campañas lado a lado en Informes.",
      "送信、開封、クリック、返信、配信停止。実行中のキャンペーンは一時停止・再開でき、レポートでキャンペーン同士を並べて比較できます。",
      "발송, 열람, 클릭, 답장, 수신 거부. 진행 중인 캠페인을 일시 중지하거나 재개하고, 리포트에서 캠페인을 나란히 비교하세요.",
    ],
    "track.t1": [
      "回覆偵測可避免跟進信疊在對方的回覆之上",
      "La detección de respuestas evita que un seguimiento llegue encima de una respuesta",
      "返信検知により、返事が来たのにフォローアップが重なって届くのを防ぎます",
      "답장 감지로 답장이 온 뒤에 후속 메일이 겹쳐 가지 않도록 합니다",
    ],
    "track.t2": [
      "透過轉址追蹤點擊，每個活動都能個別關閉",
      "Seguimiento de clics mediante una redirección que puedes desactivar por campaña",
      "リダイレクト経由のクリック追跡。キャンペーンごとにオフにできます",
      "리디렉션을 통한 클릭 추적, 캠페인별로 끌 수 있습니다",
    ],
    "track.t3": [
      "Gmail 中的互動標籤（需手動開啟）",
      "Etiquetas de interacción en Gmail, opcionales",
      "Gmail 内のエンゲージメントラベル（オプトイン）",
      "Gmail의 참여도 라벨(선택 사항)",
    ],
    "track.alt": [
      "Dispatch 活動頁面，顯示收件人與其寄送狀態",
      "Página de campaña de Dispatch con destinatarios y su estado de envío",
      "受信者と配信状況を表示した Dispatch のキャンペーンページ",
      "수신자와 발송 상태를 보여주는 Dispatch 캠페인 페이지",
    ],
    "comp.h2": [
      "第一行就很個人，到第一千封依然如此。",
      "Personal desde la primera línea, escalable hasta el envío mil.",
      "1行目から個人的に、1,000通目まで変わらず。",
      "첫 줄부터 개인적으로, 천 번째 메일까지 그대로.",
    ],
    "comp.p": [
      "合併欄位、依語言切換的簽名、可選的指定寄出時間。匯入的活動一律先成為草稿，在你按下「寄出」前不會有任何信件發出。",
      "Campos de combinación, firmas por idioma y hora de envío opcional. Las campañas importadas siempre llegan como borradores, así que nada sale hasta que pulses Enviar.",
      "差し込みフィールド、言語別の署名、任意の送信日時。インポートしたキャンペーンは必ず下書きとして届くので、「送信」を押すまで何も送られません。",
      "병합 필드, 언어별 서명, 선택적 발송 시각. 가져온 캠페인은 항상 초안으로 들어오므로 '보내기'를 누르기 전에는 아무것도 발송되지 않습니다.",
    ],
    "comp.alt": [
      "Dispatch 撰寫頁面，包含收件名單、訊息、跟進信與寄送設定",
      "Editor de Dispatch con audiencia, mensaje, seguimientos y ajustes de entrega",
      "宛先、メッセージ、フォローアップ、配信設定を備えた Dispatch の作成画面",
      "대상, 메시지, 후속 메일, 발송 설정이 있는 Dispatch 작성 화면",
    ],

    "auto.h2": [
      "接上你現有的名單來源。",
      "Conéctalo a lo que ya construye tus listas.",
      "すでにリストを作っているツールと連携。",
      "이미 목록을 만들고 있는 도구와 연결하세요.",
    ],
    "auto.p1": [
      "產生 API 金鑰後，即可從 cron、GitHub Actions、Zapier 或 n8n 送出 CSV。此金鑰只能匯入，無法寄信，也碰不到你的 Gmail 連線。重複使用相同的活動名稱，資料列就會合併進同一份草稿。",
      "Genera una clave de API y envía un CSV desde cron, GitHub Actions, Zapier o n8n. La clave solo puede importar: no puede enviar correo ni tocar tu conexión con Gmail. Si repites el nombre de la campaña, las filas se combinan en un mismo borrador.",
      "API キーを発行し、cron、GitHub Actions、Zapier、n8n から CSV を送信します。キーはインポート専用なので、メールの送信も Gmail 接続の操作もできません。同じキャンペーン名を繰り返すと、行は1つの下書きにまとまります。",
      "API 키를 발급한 뒤 cron, GitHub Actions, Zapier, n8n에서 CSV를 전송하세요. 이 키는 가져오기만 가능해 메일을 보내거나 Gmail 연결을 건드릴 수 없습니다. 같은 캠페인 이름을 반복하면 행이 하나의 초안으로 합쳐집니다.",
    ],
    "auto.p2": [
      "想留在收件匣裡操作？Gmail 外掛可直接在 Gmail 內建立並匯入活動。",
      "¿Prefieres no salir de la bandeja? El complemento de Gmail crea e importa campañas desde dentro de Gmail.",
      "受信トレイから離れたくない方へ。Gmail アドオンなら、Gmail 内でキャンペーンを作成・インポートできます。",
      "받은편지함을 벗어나고 싶지 않다면? Gmail 부가기능으로 Gmail 안에서 캠페인을 만들고 가져올 수 있습니다.",
    ],
    "auto.aria": [
      "將 CSV 送到 Dispatch 匯入端點的 curl 範例",
      "Ejemplo de curl que envía un CSV al endpoint de importación de Dispatch",
      "CSV を Dispatch のインポートエンドポイントへ送る curl の例",
      "CSV를 Dispatch 가져오기 엔드포인트로 보내는 curl 예시",
    ],

    "safe.h2": [
      "專為避開垃圾郵件匣而設計。",
      "Diseñado para no acabar en spam.",
      "迷惑メールフォルダに入らないための設計。",
      "스팸함에 들어가지 않도록 설계했습니다.",
    ],
    "safe1.b": ["控制寄送節奏", "Envío con ritmo", "ペースを保った送信", "일정한 간격의 발송"],
    "safe1.s": [
      "每封間隔約一分鐘，每日上限由你設定。超出的部分會順延到隔天。",
      "Cerca de un minuto entre mensajes, con un tope diario que tú controlas. El excedente pasa a mañana.",
      "送信間隔は約1分で、1日の上限はあなたが設定できます。超えた分は翌日に繰り越されます。",
      "메일 사이 간격은 약 1분이며 일일 한도는 직접 정할 수 있습니다. 초과분은 다음 날로 넘어갑니다.",
    ],
    "safe2.b": ["一鍵取消訂閱", "Baja con un clic", "ワンクリック配信停止", "원클릭 수신 거부"],
    "safe2.s": [
      "每封信都附有取消連結。取消訂閱的人會進入封鎖名單，套用到你所有的活動。",
      "Va en cada mensaje. Las bajas pasan a una lista de supresión que se aplica a todas tus campañas.",
      "すべてのメールに付いています。配信停止した人は抑制リストに入り、すべてのキャンペーンに適用されます。",
      "모든 메일에 포함됩니다. 수신 거부한 사람은 모든 캠페인에 적용되는 차단 목록에 추가됩니다.",
    ],
    "safe3.b": ["你的信譽，你的對話串", "Tu reputación, tu hilo", "あなたの評価、あなたのスレッド", "내 평판, 내 스레드"],
    "safe3.s": [
      "郵件從你自己的地址寄出，並像一般信件一樣串成對話，回信與寄件備份都仍屬於你。",
      "El correo sale desde tu propia dirección y se agrupa en hilos como siempre, así que las respuestas y Enviados siguen siendo tuyos.",
      "メールはあなた自身のアドレスから送られ、通常どおりスレッド化されるため、返信も送信済みフォルダもあなたのものです。",
      "메일은 내 주소에서 발송되고 평소처럼 스레드로 묶이므로 답장과 보낸편지함은 계속 내 것입니다.",
    ],
    "safe4.b": ["不盲目重試", "Sin reintentos a ciegas", "盲目的な再送はしません", "무작정 재시도하지 않음"],
    "safe4.s": [
      "若寄送結果不明，Dispatch 會標記為失敗而不是重試，所以沒有人會收到同一封信兩次。",
      "Si el resultado de un envío no está claro, Dispatch lo marca como fallido en lugar de reintentarlo, así nadie recibe el mismo correo dos veces.",
      "送信結果が不明な場合、Dispatch は再試行せず失敗として記録するため、同じメールが二重に届くことはありません。",
      "발송 결과가 불분명하면 Dispatch는 재시도하지 않고 실패로 표시하므로 같은 메일을 두 번 받는 사람이 없습니다.",
    ],

    "price.h2": [
      "免費開始，名單變大再升級。",
      "Empieza gratis. Mejora cuando crezca la lista.",
      "無料で始めて、リストが増えたらアップグレード。",
      "무료로 시작하고, 목록이 커지면 업그레이드하세요.",
    ],
    "free.name": ["免費版", "Gratis", "無料", "무료"],
    "free.f1": ["每天 10 封", "10 envíos al día", "1日10通", "하루 10통"],
    "free.f2": ["1 個 Gmail 信箱", "1 buzón de Gmail", "Gmail メールボックス1つ", "Gmail 메일함 1개"],
    "free.f3": [
      "追蹤、跟進信、API 匯入",
      "Seguimiento, recordatorios, importación por API",
      "追跡、フォローアップ、API インポート",
      "추적, 후속 메일, API 가져오기",
    ],
    "pro.mo": [" / 月", " / mes", " / 月", " / 월"],
    "pro.small": [
      "或選擇年繳：每月 $15（共 $180）",
      "o $15 / mes facturado anualmente, $180",
      "または年払いで月 $15（年額 $180）",
      "또는 연간 결제 시 월 $15(연 $180)",
    ],
    "pro.f1": ["每天 500 封", "500 envíos al día", "1日500通", "하루 500통"],
    "pro.f2": ["3 個 Gmail 信箱", "3 buzones de Gmail", "Gmail メールボックス3つ", "Gmail 메일함 3개"],
    "pro.f3": ["包含免費版的所有功能", "Todo lo de Gratis", "無料プランのすべて", "무료 플랜의 모든 기능"],
    "pro.cta": ["升級 Pro", "Hazte Pro", "Pro にする", "Pro 시작하기"],

    "final.h2": [
      "你的下一批開發信，像真人寄的一樣。",
      "Tu próxima tanda de mensajes, enviada como la enviaría una persona.",
      "次のアウトリーチも、人が送ったように届ける。",
      "다음 아웃리치도, 사람이 보낸 것처럼.",
    ],
    "foot.help": ["說明", "Ayuda", "ヘルプ", "도움말"],
    "foot.privacy": ["隱私權", "Privacidad", "プライバシー", "개인정보"],
    "foot.terms": ["條款", "Términos", "利用規約", "이용약관"],

    "meta.title": [
      "Dispatch · 從你自己的 Gmail 發送開發信",
      "Dispatch · Prospección en frío desde tu propio Gmail",
      "Dispatch · あなた自身の Gmail から送るコールドメール",
      "Dispatch · 내 Gmail에서 보내는 콜드 메일",
    ],
    "meta.desc": [
      "寫一次、加入收件人，Dispatch 就從你的 Gmail 一封一封寄出個人化郵件：控制節奏、追蹤成效，並持續跟進直到對方回覆。",
      "Escribe una vez, añade destinatarios y Dispatch envía un correo personal a la vez desde tu Gmail, con ritmo, seguimiento y recordatorios hasta que respondan.",
      "一度書いて宛先を追加するだけ。Dispatch があなたの Gmail から1通ずつ、ペースを保って送信・追跡し、返信が来るまでフォローアップします。",
      "한 번 작성하고 수신자를 추가하면 Dispatch가 내 Gmail에서 개인 메일을 한 통씩 일정한 간격으로 보내고, 추적하며, 답장이 올 때까지 후속 발송합니다.",
    ],
    "meta.ogdesc": [
      "控制節奏、可追蹤、個人化。回信與寄件備份都屬於你。",
      "Con ritmo, con seguimiento, personal. Las respuestas y Enviados siguen siendo tuyos.",
      "ペース管理、追跡、パーソナル。返信も送信済みフォルダもあなたのもの。",
      "일정한 간격, 추적, 개인 맞춤. 답장과 보낸편지함은 내 것으로.",
    ],
  };

  const META = [
    ["meta[name=description]", "content", "meta.desc"],
    ["meta[property='og:title']", "content", "meta.title"],
    ["meta[property='og:description']", "content", "meta.ogdesc"],
  ];

  const select = document.getElementById("lang");
  const root = document.documentElement;
  const original = new Map();

  const orig = (el, slot, read) => {
    const key = slot;
    if (!original.has(el)) original.set(el, {});
    const o = original.get(el);
    if (!(key in o)) o[key] = read();
    return o[key];
  };
  const pick = (key, i, fallback) => (i < 0 ? fallback : (T[key] && T[key][i]) || fallback);

  function loadFont(lang) {
    const spec = FONTS[lang];
    if (!spec || document.getElementById("font-" + lang)) return;
    const link = document.createElement("link");
    link.id = "font-" + lang;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=" + spec + "&display=swap";
    document.head.appendChild(link);
  }

  function apply(lang) {
    const i = LANGS.indexOf(lang);
    if (i >= 0) loadFont(lang);
    root.lang = i < 0 ? "en" : lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = pick(el.dataset.i18n, i, orig(el, "t", () => el.textContent));
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = pick(el.dataset.i18nHtml, i, orig(el, "h", () => el.innerHTML));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      el.alt = pick(el.dataset.i18nAlt, i, orig(el, "alt", () => el.alt));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", pick(el.dataset.i18nAria, i, orig(el, "aria", () => el.getAttribute("aria-label"))));
    });
    META.forEach(([sel, attr, key]) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute(attr, pick(key, i, orig(el, attr, () => el.getAttribute(attr))));
    });
    document.title = pick("meta.title", i, orig(document.head, "title", () => document.title));
    if (select) select.value = i < 0 ? "en" : lang;
  }

  function match(code) {
    const c = (code || "").toLowerCase();
    if (c.startsWith("zh")) return "zh-TW";
    if (c.startsWith("es")) return "es";
    if (c.startsWith("ja")) return "ja";
    if (c.startsWith("ko")) return "ko";
    if (c.startsWith("en")) return "en";
    return null;
  }

  function initial() {
    let saved = null;
    try { saved = localStorage.getItem("lang"); } catch (e) { saved = null; }
    const q = new URLSearchParams(location.search).get("lang");
    const candidates = [q, saved].concat(navigator.languages || [navigator.language]);
    for (const c of candidates) {
      const m = match(c);
      if (m) return m;
    }
    return "en";
  }

  if (select) {
    select.addEventListener("change", () => {
      try { localStorage.setItem("lang", select.value); } catch (e) { return apply(select.value); }
      apply(select.value);
    });
  }

  const start = initial();
  if (start !== "en") apply(start);
  else if (select) select.value = "en";
})();
