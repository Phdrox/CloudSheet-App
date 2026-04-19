'use client'
import { motion } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';


const plans = [
  {
    name: 'Básico',
    price: 'Grátis',
    period: 'para sempre',
    description: 'Perfeito para começar a organizar suas finanças',
    features: [
      'Até 50 transações/mês',
      'Gráficos básicos',
      'Até 3 metas',
      'Suporte por email',
      'Exportação em CSV',
    ],
    color: 'from-gray-600 to-gray-700',
    popular: false,
  },
  {
    name: 'Profissional',
    price: 'R$ 29,90',
    period: '/mês',
    description: 'Ideal para quem busca controle completo',
    features: [
      'Transações ilimitadas',
      'Todos os gráficos e relatórios',
      'Metas ilimitadas',
      'Suporte prioritário 24/7',
      'Exportação avançada (PDF, Excel)',
      'Categorias personalizadas',
      'Alertas e notificações',
      'API de integração',
    ],
    color: 'from-blue-600 to-teal-500',
    popular: true,
  },
  {
    name: 'Empresarial',
    price: 'R$ 99,90',
    period: '/mês',
    description: 'Solução completa para empresas',
    features: [
      'Tudo do Profissional',
      'Múltiplos usuários (até 10)',
      'Gestão de equipes',
      'Relatórios avançados',
      'Integrações premium',
      'Consultoria personalizada',
      'SLA garantido',
      'Treinamento da equipe',
    ],
    color: 'from-teal-600 to-blue-700',
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="precos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Planos e{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Preços
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades. Sem taxas ocultas, cancele quando quiser.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative p-8 rounded-2xl border-2 ${
                plan.popular
                  ? 'border-blue-600 shadow-2xl scale-105'
                  : 'border-gray-200 hover:border-blue-300'
              } bg-white transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-full text-sm font-medium">
                    <Sparkles size={14} />
                    Mais Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period !== 'para sempre' && (
                    <span className="text-gray-600">{plan.period}</span>
                  )}
                </div>
                {plan.period === 'para sempre' && (
                  <span className="text-gray-600 text-sm">{plan.period}</span>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-5 h-5 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Check size={14} className="text-white" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:shadow-xl'
                    : 'border-2 border-gray-300 text-gray-900 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                {plan.price === 'Grátis' ? 'Começar Grátis' : 'Assinar Agora'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
