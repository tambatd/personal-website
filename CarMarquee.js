class CarMarquee extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    this.shadowRoot.innerHTML = `
      <marquee direction="right">
        <pre>
          ____
        _/|_|_\\___
   ~   \\  ;  -     \\
    ~~  \` (_)--(_)\`      
        </pre>
      </marquee>
    `;
    
    this.interval = null;
    this.isDouble = false;
  }
  
  connectedCallback() {
    const pre = this.shadowRoot.querySelector('pre');
    
    this.interval = setInterval(() => {
      const lines = pre.innerHTML.split('\n');
      lines[2] = lines[2].replace(/~+\s+/, this.isDouble ? "~~  " : "~   ");
      lines[3] = lines[3].replace(/~+\s+/, this.isDouble ? "~   " : "~~  ");
      pre.innerHTML = lines.join('\n');
      this.isDouble = !this.isDouble;
    }, 500);
  }
  
  disconnectedCallback() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

customElements.define('car-marquee', CarMarquee); 