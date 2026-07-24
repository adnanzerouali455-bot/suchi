import { useState, type FormEvent } from 'react';
import { Calendar, Clock, Users, User, Phone, MessageSquare, Check, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useReveal } from '../hooks/useReveal';

const RESTAURANT_ADDRESS = 'Avenue Mohammed V, Berkane 35000, Maroc';
const MAP_QUERY = encodeURIComponent(RESTAURANT_ADDRESS);

export default function Reservation() {
  const { ref, visible } = useReveal();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      reservation_date: String(formData.get('date') || ''),
      reservation_time: String(formData.get('time') || ''),
      party_size: Number(formData.get('people') || 2),
      message: String(formData.get('message') || '').trim() || null,
    };

    if (!payload.name || !payload.phone || !payload.reservation_date || !payload.reservation_time) {
      setStatus('error');
      setErrorMsg('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const { error } = await supabase.from('reservations').insert(payload);

    if (error) {
      setStatus('error');
      setErrorMsg('Une erreur est survenue. Veuillez réessayer ou nous appeler directement.');
      return;
    }

    setStatus('success');
    e.currentTarget.reset();
  };

  return (
    <section id="reservation" className="relative bg-sumi-900 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={ref} className={`reveal mx-auto max-w-2xl text-center ${visible ? 'is-visible' : ''}`}>
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-kin-300/80">Réservation</p>
          <h2 className="font-serif text-4xl font-light text-sumi-50 sm:text-5xl">
            Réservez votre <span className="text-kin-300">table</span>
          </h2>
          <p className="mt-4 text-sm font-light text-sumi-300">
            Réservez en quelques secondes. Nous vous confirmerons par téléphone.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-2xl border border-sumi-700/40 bg-sumi-950/60 p-6 sm:p-8">
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600/20 border border-green-500/40">
                  <Check size={32} className="text-green-400" />
                </div>
                <h3 className="mt-6 font-serif text-2xl text-sumi-50">Demande envoyée !</h3>
                <p className="mt-2 max-w-sm text-sm font-light text-sumi-300">
                  Merci ! Nous vous contacterons très bientôt pour confirmer votre réservation.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 rounded-full border border-kin-400/50 px-6 py-2 text-sm text-kin-200 transition-colors hover:bg-kin-400/10"
                >
                  Nouvelle réservation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field icon={User} name="name" label="Nom complet" placeholder="Votre nom" required />
                  <Field icon={Phone} name="phone" label="Téléphone" placeholder="06 00 00 00 00" type="tel" required />
                </div>
                <div className="grid gap-5 sm:grid-cols-3">
                  <Field icon={Calendar} name="date" label="Date" type="date" required />
                  <Field icon={Clock} name="time" label="Heure" type="time" required />
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs uppercase tracking-wider text-sumi-400">
                      <Users size={12} /> Personnes
                    </label>
                    <select
                      name="people"
                      defaultValue={2}
                      className="w-full rounded-lg border border-sumi-700/50 bg-sumi-900 px-4 py-2.5 text-sm text-sumi-50 outline-none transition-colors focus:border-kin-400"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>{n} {n > 1 ? 'personnes' : 'personne'}</option>
                      ))}
                      <option value={10}>10+ (groupe)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs uppercase tracking-wider text-sumi-400">
                    <MessageSquare size={12} /> Message (optionnel)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Allergies, occasion spéciale, demandes particulières..."
                    className="w-full resize-none rounded-lg border border-sumi-700/50 bg-sumi-900 px-4 py-2.5 text-sm text-sumi-50 placeholder-sumi-500 outline-none transition-colors focus:border-kin-400"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 rounded-lg border border-shu-700/40 bg-shu-950/40 px-4 py-3 text-sm text-shu-300">
                    <AlertCircle size={16} />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full rounded-full bg-shu-600 px-6 py-3.5 text-sm font-medium tracking-wide text-white transition-all hover:bg-shu-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'loading' ? 'Envoi en cours...' : 'Confirmer la réservation'}
                </button>
              </form>
            )}
          </div>

          {/* Map + info */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-2xl border border-sumi-700/40">
              <iframe
                title="Carte Suchi For You"
                src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                className="h-72 w-full grayscale-[0.3] contrast-110"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="rounded-2xl border border-sumi-700/40 bg-sumi-950/60 p-6">
              <h3 className="font-serif text-lg text-kin-300">Suchi For You — Berkane</h3>
              <p className="mt-2 text-sm font-light text-sumi-300">{RESTAURANT_ADDRESS}</p>
              <div className="mt-4 space-y-1.5 text-sm font-light text-sumi-300">
                <p className="flex justify-between"><span>Lun — Jeu</span><span>12h00 – 23h00</span></p>
                <p className="flex justify-between"><span>Ven — Sam</span><span>12h00 – 00h00</span></p>
                <p className="flex justify-between"><span>Dimanche</span><span>14h00 – 23h00</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  icon: Icon,
  name,
  label,
  placeholder,
  type = 'text',
  required,
}: {
  icon: typeof User;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs uppercase tracking-wider text-sumi-400">
        <Icon size={12} /> {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-sumi-700/50 bg-sumi-900 px-4 py-2.5 text-sm text-sumi-50 placeholder-sumi-500 outline-none transition-colors focus:border-kin-400"
      />
    </div>
  );
}
