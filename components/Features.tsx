'use client'
import { motion } from 'motion/react';
import { PiggyBank, TrendingUp, Target, BarChart3, Edit, Trash2 } from 'lucide-react';

const features = [
  {
    icon: Edit,
    title: 'Cadastro de Fluxos',
    description: 'Registre facilmente todos seus gastos e ganhos com interface intuitiva e rápida.',
    color: 'from-blue-600 to-blue-400',
  },
  {
    icon: BarChart3,
    title: 'Gráficos Inteligentes',
    description: 'Visualize suas finanças com gráficos dinâmicos e relatórios detalhados em tempo real.',
    color: 'from-teal-500 to-teal-400',
  },
  {
    icon: Target,
    title: 'Criação de Metas',
    description: 'Defina objetivos financeiros e acompanhe seu progresso com metas personalizadas.',
    color: 'from-blue-500 to-teal-500',
  },
  {
    icon: PiggyBank,
    title: 'Controle Total',
    description: 'Edite ou exclua transações a qualquer momento, mantendo histórico completo.',
    color: 'from-teal-600 to-blue-600',
  },
 
];

export function Features() {
  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Funcionalidades{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Poderosas
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tudo que você precisa para ter controle total sobre suas finanças pessoais ou empresariais
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
