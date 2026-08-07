import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Compass, FileText, Home, Layers3, Menu, MessageCircle, Paperclip, PenLine, Ruler, ShieldCheck, Sparkles, X } from 'lucide-react';

const queryClient = new QueryClient();

const bookingDates = [
  { label: 'Lun. 11', day: 'Lundi', isWeekend: false },
  { label: 'Mar. 12', day: 'Mardi', isWeekend: false },
  { label: 'Mer. 13', day: 'Mercredi', isWeekend: false },
  { label: 'Jeu. 14', day: 'Jeudi', isWeekend: false },
  { label: 'Ven. 15', day: 'Vendredi', isWeekend: false },
  { label: 'Sam. 16', day: 'Samedi', isWeekend: true },
  { label: 'Dim. 17', day: 'Dimanche', isWeekend: true },
];

const weekdaySlots = ['18:30', '19:00', '19:30', '20:00', '20:30'];
const weekendSlots = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00', '18:30', '19:30'];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stage, setStage] = useState(0);
  const [selected, setSelected] = useState<number[]>([0, 1, 2]);
  const [project, setProject] = useState('Extension');
  const [budget, setBudget] = useState('100 000 – 200 000 €');
  const [step, setStep] = useState(0);
  const [date, setDate] = useState('Jeu. 14');
  const [slot, setSlot] = useState('18:30');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [formSent, setFormSent] = useState(false);
  const [bookingSent, setBookingSent] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('set-selection');
    if (saved) setSelected(JSON.parse(saved));
  }, []);
  useEffect(() => {
    window.localStorage.setItem('set-selection', JSON.stringify(selected));
  }, [selected]);

  const toggleStage = (index: number) => setSelected((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index].sort());
  const selectedBookingDate = bookingDates.find((item) => item.label === date) ?? bookingDates[3];
  const availableSlots = selectedBookingDate.isWeekend ? weekendSlots : weekdaySlots;
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="set-app">
          <header className="set-nav" data-testid="header-navigation">
            <button className="set-logo" onClick={() => scrollTo('top')} data-testid="button-logo">
              <span className="set-logo-mark">S</span><span>SET</span>
            </button>
            <nav className={mobileOpen ? 'set-nav-links open' : 'set-nav-links'} aria-label="Navigation principale">
              <button onClick={() => scrollTo('journey')} data-testid="link-stages">Les 7 étapes</button>
              <button onClick={() => scrollTo('method')} data-testid="link-method">Notre méthode</button>
              <button onClick={() => scrollTo('faq')} data-testid="link-faq">Questions fréquentes</button>
              <button className="nav-cta" onClick={() => scrollTo('configurator')} data-testid="link-start">Commencer mon projet <ArrowUpRight size={15} /></button>
            </nav>
            <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Ouvrir le menu" data-testid="button-mobile-menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </header>

          <main>
            <section className="hero" id="top">
              <div className="hero-copy reveal">
                <div className="eyebrow"><span className="eyebrow-line" /> Architecture, simplement</div>
                <h1>Votre projet.<br /><em>Bien établi.</em></h1>
                <p className="hero-lede">De la première idée à la réalisation, SET vous accompagne à chaque étape de votre projet architectural.</p>
                <div className="hero-actions">
                  <button className="button button-dark" onClick={() => scrollTo('configurator')} data-testid="button-hero-start">Démarrer mon projet <ArrowRight size={17} /></button>
                  <button className="text-link" onClick={() => scrollTo('journey')} data-testid="button-hero-stages">Découvrir les 7 étapes <ArrowDown size={16} /></button>
                </div>
                <div className="hero-proof"><ShieldCheck size={16} /><span>Conseil indépendant · Sans engagement · 100% français</span></div>
              </div>
              <div className="hero-visual reveal reveal-delay">
                <div className="hero-image" role="img" aria-label="Maison contemporaine baignée de lumière" />
                <div className="hero-stamp"><span>SET</span><strong>07</strong><small>étapes pour<br />y voir clair</small></div>
                <div className="hero-caption">Maison des pins · Landes<br /><span>Étude & suivi SET</span></div>
              </div>
              <div className="hero-scroll"><span>Faire défiler</span><div /></div>
            </section>

            <section className="intro-band" id="method">
              <div className="section-kicker">01 — Une autre façon de construire</div>
              <div className="intro-grid">
                <h2>Moins de flou.<br /><em>Plus de projet.</em></h2>
                <div className="intro-text"><p>Construire, agrandir ou rénover est un projet de vie. Pourtant, les démarches sont souvent opaques, les décisions fragmentées, et les bons interlocuteurs difficiles à trouver.</p><p>SET transforme cette complexité en un chemin lisible. Vous savez où vous en êtes, ce qui vient après, et pourquoi.</p><button className="text-link" onClick={() => scrollTo('configurator')} data-testid="button-intro-configure">Voir ce dont j'ai besoin <ArrowRight size={16} /></button></div>
              </div>
              <div className="metric-row"><div><strong>7</strong><span>étapes claires</span></div><div><strong>1</strong><span>interlocuteur dédié</span></div><div><strong>0</strong><span>mauvaise surprise</span></div></div>
            </section>

            <section className="journey-section" id="journey">
              <div className="section-heading">
                <div><div className="section-kicker">02 — La méthode SET</div><h2>Le projet, <em>étape par étape.</em></h2></div>
                <p>Chaque projet est différent. La méthode, elle, reste la même : sept repères pour avancer avec confiance.</p>
              </div>
              <div className="stage-feature">
                <div className="stage-image" style={{ backgroundImage: `url(${stages[stage].image})` }}><span className="stage-number">0{stages[stage].number}</span><span className="stage-image-caption">{stages[stage].caption}</span></div>
                <div className="stage-detail">
                  <div className="stage-topline"><span>Étape {String(stages[stage].number).padStart(2, '0')} / 07</span><span>{stages[stage].duration}</span></div>
                  <div className="stage-icon">{stages[stage].icon}</div>
                  <h3>{stages[stage].title}</h3><p className="stage-subtitle">{stages[stage].subtitle}</p><p>{stages[stage].description}</p>
                  <div className="deliverable"><span>Vous repartez avec</span><strong>{stages[stage].deliverable}</strong></div>
                  <div className="stage-controls"><button onClick={() => setStage((stage + 6) % 7)} aria-label="Étape précédente" data-testid="button-stage-prev"><ChevronLeft /></button><div className="stage-progress">{stages.map((item, index) => <button key={item.number} className={index === stage ? 'active' : ''} onClick={() => setStage(index)} aria-label={`Étape ${index + 1}`} data-testid={`button-stage-${index + 1}`} />)}</div><button onClick={() => setStage((stage + 1) % 7)} aria-label="Étape suivante" data-testid="button-stage-next"><ChevronRight /></button></div>
                </div>
              </div>
              <div className="stage-strip">{stages.map((item, index) => <button key={item.number} className={index === stage ? 'stage-strip-item active' : 'stage-strip-item'} onClick={() => setStage(index)} data-testid={`card-stage-${index + 1}`}><span>0{item.number}</span><strong>{item.title}</strong><ArrowUpRight size={15} /></button>)}</div>
            </section>

            <section className="config-section" id="configurator">
              <div className="config-intro"><div className="section-kicker light">03 — Votre feuille de route</div><h2>On part de<br /><em>vous.</em></h2><p>Quelques questions suffisent pour dessiner un accompagnement adapté à votre projet. Rien à créer, rien à retenir.</p><div className="config-aside"><Sparkles size={17} /><span>Votre sélection est sauvegardée automatiquement.</span></div></div>
              <div className="config-card">
                {!formSent && <><div className="config-progress"><span>Question {step + 1} sur 3</span><div><i style={{ width: `${((step + 1) / 3) * 100}%` }} /></div></div>
                {step === 0 && <div className="question"><h3>Quel est votre projet ?</h3><p>Le point de départ qui nous permettra de vous orienter.</p><div className="choice-grid">{['Construction neuve', 'Extension', 'Rénovation', 'Permis ou déclaration'].map((item) => <button className={project === item ? 'choice selected' : 'choice'} onClick={() => setProject(item)} key={item} data-testid={`choice-project-${item}`}><span>{item === 'Extension' ? <Layers3 /> : item === 'Rénovation' ? <PenLine /> : item === 'Construction neuve' ? <Home /> : <FileText />}</span>{item}{project === item && <Check className="choice-check" size={16} />}</button>)}</div></div>}
                {step === 1 && <div className="question"><h3>Quel budget envisagez-vous ?</h3><p>Une estimation, même large, nous aide à calibrer le conseil.</p><div className="budget-list">{['Moins de 80 000 €', '80 000 – 100 000 €', '100 000 – 200 000 €', 'Plus de 200 000 €', 'Je ne sais pas encore'].map((item) => <button className={budget === item ? 'budget selected' : 'budget'} key={item} onClick={() => setBudget(item)} data-testid={`choice-budget-${item}`}><span>{item}</span>{budget === item && <Check size={16} />}</button>)}</div></div>}
                {step === 2 && <div className="question"><h3>Où en êtes-vous aujourd’hui ?</h3><p>Il n'y a pas de mauvais moment pour nous rejoindre.</p><div className="budget-list">{['Je réfléchis encore', 'J’ai une idée précise', 'J’ai déjà des plans', 'Mon projet est prêt à démarrer'].map((item, index) => <button className={index === 1 ? 'budget selected' : 'budget'} key={item} data-testid={`choice-status-${index}`}><span>{item}</span>{index === 1 && <Check size={16} />}</button>)}</div></div>}
                <div className="question-actions">{step > 0 && <button className="text-link light-link" onClick={() => setStep(step - 1)} data-testid="button-config-back"><ChevronLeft size={16} /> Retour</button>}<button className="button button-mint" onClick={() => step < 2 ? setStep(step + 1) : scrollTo('roadmap')} data-testid="button-config-next">{step < 2 ? 'Continuer' : 'Voir ma feuille de route'} <ArrowRight size={17} /></button></div></>}
                {formSent && <div className="success-state"><div className="success-icon"><Check /></div><div className="section-kicker">Demande bien reçue</div><h3>On revient vers vous<br /><em>très vite.</em></h3><p>Merci {project.toLowerCase()} fait partie des projets que SET aime accompagner. Un membre de l'équipe vous répondra sous 24 heures ouvrées.</p><button className="text-link light-link" onClick={() => setFormSent(false)} data-testid="button-config-reset">Modifier mes réponses <PenLine size={15} /></button></div>}
              </div>
            </section>

            <section className="roadmap-section" id="roadmap">
              <div className="section-heading"><div><div className="section-kicker">04 — Votre recommandation</div><h2>Un chemin qui<br /><em>vous ressemble.</em></h2></div><p>À partir de vos réponses, voici les étapes que nous vous conseillons. Ajustez-les librement.</p></div>
              <div className="roadmap-meta"><div className="roadmap-project"><span className="mini-label">VOTRE PROJET</span><strong>{project}</strong><span>{budget}</span></div><div className="roadmap-total"><span className="mini-label">ACCOMPAGNEMENT ESTIMÉ</span><strong>{selected.length} étapes <small>sur 7</small></strong><span>Environ {selected.length * 3 + 2} à {selected.length * 5 + 4} semaines</span></div></div>
              <div className="roadmap-line">{stages.map((item, index) => <div className={selected.includes(index) ? 'roadmap-item selected' : 'roadmap-item'} key={item.number}><button onClick={() => toggleStage(index)} data-testid={`toggle-roadmap-${index + 1}`}><span className="roadmap-dot">{selected.includes(index) ? <Check size={14} /> : String(index + 1).padStart(2, '0')}</span><span className="roadmap-name">{item.title}</span><span className="roadmap-duration">{item.duration}</span></button><div className="roadmap-deliverable">{item.deliverable}</div></div>)}</div>
              <div className="roadmap-actions"><p><CircleHelp size={16} /> Cliquez sur une étape pour l'ajouter ou la retirer.</p><button className="button button-dark" onClick={() => scrollTo('booking')} data-testid="button-roadmap-book">Parler de mon projet <ArrowRight size={17} /></button></div>
            </section>

            <section className="booking-section" id="booking">
              <div className="booking-copy"><div className="section-kicker">05 — Faire le point</div><h2>Un premier échange<br /><em>sans détour.</em></h2><p>45 minutes pour poser vos questions, vérifier la faisabilité et repartir avec des prochaines étapes concrètes.</p><div className="booking-note"><CalendarDays size={18} /><div><strong>Consultation projet</strong><span>45 min · 90 € TTC · Visioconférence</span></div></div></div>
              <div className="booking-card">{!bookingSent ? <><div className="booking-card-header"><div><span>Choisissez votre créneau</span><small className="booking-availability">En semaine dès 18h30 · Week-end toute la journée</small></div><span className="secure"><ShieldCheck size={13} /> Paiement après confirmation</span></div><div className="date-row">{bookingDates.map((item, index) => <button className={date === item.label ? 'date selected' : 'date'} onClick={() => { setDate(item.label); setSlot(item.isWeekend ? weekendSlots[0] : weekdaySlots[0]); }} key={item.label} data-testid={`button-date-${index}`}><small>{item.day}</small><strong>{item.label.split(' ')[1]}</strong></button>)}</div><div className="slot-grid">{availableSlots.map((item) => <button className={slot === item ? 'slot selected' : 'slot'} onClick={() => setSlot(item)} key={item} data-testid={`button-slot-${item}`}>{item}</button>)}</div><button className="button button-dark full" onClick={() => setBookingSent(true)} data-testid="button-book-confirm">Réserver le {date} à {slot} <ArrowRight size={17} /></button></> : <div className="booking-success"><div className="success-icon"><Check /></div><h3>C’est noté.</h3><p>Votre demande pour le <strong>{date} à {slot}</strong> est bien enregistrée. Nous vous envoyons la confirmation par email.</p><button className="text-link" onClick={() => setBookingSent(false)} data-testid="button-book-edit">Choisir un autre créneau <ChevronRight size={16} /></button></div>}</div>
            </section>

            <section className="contact-section" id="contact">
              <div className="contact-heading"><div className="section-kicker">06 — Parlons de votre projet</div><h2>Une question,<br /><em>une idée ?</em></h2><p>Décrivez-nous votre projet, même s’il n’est qu’au début. Nous vous répondrons avec un premier éclairage utile.</p></div>
              <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setFormSent(true); }}><div className="form-row"><label>Prénom<input required placeholder="Camille" data-testid="input-first-name" /></label><label>Nom<input required placeholder="Martin" data-testid="input-last-name" /></label></div><label>Email professionnel<input type="email" required placeholder="camille@exemple.fr" data-testid="input-email" /></label><label>Votre message<textarea required placeholder="Je souhaite vous parler de..." rows={4} data-testid="input-message" /></label><label className="file-label"><Paperclip size={16} /> Ajouter un plan, croquis ou photo <input type="file" multiple data-testid="input-file" /></label><div className="form-bottom"><span>Réponse sous 24 heures ouvrées</span><button className="button button-dark" type="submit" data-testid="button-contact-submit">Être recontacté <ArrowRight size={17} /></button></div></form>
            </section>

            <section className="faq-section" id="faq"><div className="section-heading"><div><div className="section-kicker">07 — Les questions que l’on se pose</div><h2>Clair dès<br /><em>le départ.</em></h2></div><p>Vous ne trouvez pas votre réponse ? <button className="inline-button" onClick={() => scrollTo('contact')} data-testid="button-faq-contact">Écrivez-nous.</button></p></div><div className="faq-list">{faqs.map((item, index) => <div className={faqOpen === index ? 'faq-item open' : 'faq-item'} key={item.question}><button onClick={() => setFaqOpen(faqOpen === index ? null : index)} data-testid={`button-faq-${index}`}><span>{item.question}</span><ChevronDown size={18} /></button>{faqOpen === index && <p>{item.answer}</p>}</div>)}</div></section>
          </main>
          <footer className="set-footer"><div className="footer-brand"><button className="set-logo inverse" onClick={() => scrollTo('top')} data-testid="button-footer-logo"><span className="set-logo-mark">S</span><span>SET</span></button><p>Établir les bons repères<br />pour mieux construire.</p></div><div className="footer-links"><div><span>Explorer</span><button onClick={() => scrollTo('journey')} data-testid="footer-link-stages">Les 7 étapes</button><button onClick={() => scrollTo('method')} data-testid="footer-link-method">La méthode</button><button onClick={() => scrollTo('faq')} data-testid="footer-link-faq">FAQ</button></div><div><span>Parlons-nous</span><button onClick={() => scrollTo('contact')} data-testid="footer-link-contact">Nous contacter</button><button onClick={() => scrollTo('booking')} data-testid="footer-link-booking">Réserver une consultation</button></div></div><div className="footer-bottom"><span>© 2024 SET Architecture</span><span>Paris · Bordeaux · Partout en France</span><span>Mentions légales · Confidentialité</span></div></footer>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

const stages = [
  { number: 1, title: 'Clarifier', subtitle: 'L’idée devient projet.', duration: '1 — 2 semaines', description: 'Nous échangeons sur vos envies, vos contraintes et votre quotidien pour poser un cap réaliste.', deliverable: 'Un programme clair et chiffré', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85', caption: 'Maison de la côte · 2023', icon: <Compass size={23} /> },
  { number: 2, title: 'Implanter', subtitle: 'Le lieu révèle son potentiel.', duration: '2 — 3 semaines', description: 'Analyse du terrain, du bâti et des règles locales : nous identifions les opportunités avant de dessiner.', deliverable: 'Une étude de faisabilité', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85', caption: 'Étude de site · Gironde', icon: <Ruler size={23} /> },
  { number: 3, title: 'Concevoir', subtitle: 'Les premières lignes prennent vie.', duration: '3 — 5 semaines', description: 'Plans, volumes, lumière et matières : nous donnons une forme sensible et précise à votre projet.', deliverable: 'Un concept architectural', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85', caption: 'Esquisse · Bassin d’Arcachon', icon: <PenLine size={23} /> },
  { number: 4, title: 'Autoriser', subtitle: 'Le projet devient officiel.', duration: '2 — 4 semaines', description: 'Nous préparons et déposons les pièces nécessaires, en dialogue avec les services instructeurs.', deliverable: 'Un dossier prêt à déposer', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85', caption: 'Dossier administratif · Landes', icon: <FileText size={23} /> },
  { number: 5, title: 'Préparer', subtitle: 'Chaque détail compte.', duration: '3 — 6 semaines', description: 'Des plans techniques au choix des entreprises, nous transformons l’intention en réalité constructive.', deliverable: 'Un dossier de consultation', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85', caption: 'Détails constructifs · Paris', icon: <Layers3 size={23} /> },
  { number: 6, title: 'Construire', subtitle: 'Le projet prend sa place.', duration: 'Selon chantier', description: 'Un suivi attentif pour garder le cap, coordonner les acteurs et garantir la qualité imaginée.', deliverable: 'Un chantier bien accompagné', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85', caption: 'Suivi de chantier · Lyon', icon: <Home size={23} /> },
  { number: 7, title: 'Habiter', subtitle: 'Le lieu devient le vôtre.', duration: '1 semaine', description: 'Dernières vérifications, réception et transmission : nous vous aidons à prendre pleinement possession du projet.', deliverable: 'Un lieu prêt à vivre', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85', caption: 'Maison livrée · Provence', icon: <Sparkles size={23} /> },
];
const faqs = [
  { question: 'SET travaille-t-il partout en France ?', answer: 'Oui. Nous accompagnons les projets à distance partout en France, avec des visites sur site selon les besoins du projet et sa localisation.' },
  { question: 'Dois-je avoir déjà un architecte ?', answer: 'Non. SET peut intervenir dès la première idée, ou rejoindre un projet déjà avancé pour une étape précise. La méthode s’adapte à votre situation.' },
  { question: 'Combien coûte un accompagnement ?', answer: 'Chaque projet est unique. Après votre échange, nous vous remettons une proposition transparente, étape par étape, sans engagement.' },
  { question: 'Puis-je ne choisir qu’une seule étape ?', answer: 'Bien sûr. Vous gardez la main sur votre accompagnement et pouvez sélectionner uniquement les étapes dont vous avez besoin.' },
  { question: 'La consultation à 90 € est-elle déduite ?', answer: 'La consultation est un premier temps de travail à part entière. Elle peut ensuite ouvrir sur une mission complète, selon vos besoins.' },
];
