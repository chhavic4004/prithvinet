import { useState } from 'react';
import { motion } from 'framer-motion';
import { Recycle, Package, ArrowRightLeft, Users, Plus, Leaf, Award, Wrench } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { KPICard } from '@/components/common/KPICard';
import { ProgressBar } from '@/components/common/ProgressBar';
import { mockProducts, mockMaterialListings, mockConsumerProducts } from '@/data/mockData';
import { Product, MaterialListing, ConsumerProduct } from '@/types';

type TabType = 'lifecycle' | 'exchange' | 'consumer';

const CircularEconomyPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('lifecycle');
  const [products] = useState<Product[]>(mockProducts);
  const [listings] = useState<MaterialListing[]>(mockMaterialListings);
  const [consumerProducts] = useState<ConsumerProduct[]>(mockConsumerProducts);

  const tabs = [
    { id: 'lifecycle' as TabType, label: 'Product Lifecycle', icon: Package },
    { id: 'exchange' as TabType, label: 'Material Exchange', icon: ArrowRightLeft },
    { id: 'consumer' as TabType, label: 'Consumer Dashboard', icon: Users },
  ];

  const getLifecycleProgress = (stage: Product['lifecycleStage']) => {
    const stages = ['Raw Materials', 'Manufacturing', 'Distribution', 'Use', 'End of Life'];
    return ((stages.indexOf(stage) + 1) / stages.length) * 100;
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Circular Economy Hub</h1>
          <p className="text-muted-foreground">Sustainable material management and product lifecycle tracking</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'lifecycle' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Product Lifecycle Tracking</h2>
              <button className="btn-primary flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="card-flat">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <span className="text-xs bg-muted px-2 py-1">{product.lifecycleStage}</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Lifecycle Progress</span>
                        <span>{Math.round(getLifecycleProgress(product.lifecycleStage))}%</span>
                      </div>
                      <ProgressBar value={getLifecycleProgress(product.lifecycleStage)} variant="primary" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Carbon Footprint</span>
                      <span className="font-medium">{product.carbonFootprint} kg CO2</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'exchange' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Exchange KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <KPICard
                title="CO2 Saved"
                value="12.5 tons"
                icon={Leaf}
                badge="This Month"
                badgeVariant="success"
              />
              <KPICard
                title="Materials Diverted"
                value="8,450 kg"
                icon={Recycle}
                trend={{ value: 23, direction: 'up' }}
              />
              <KPICard
                title="Active Exchanges"
                value="28"
                icon={ArrowRightLeft}
              />
            </div>

            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Material Listings</h2>
              <button className="btn-primary flex items-center gap-2">
                <Plus className="w-4 h-4" />
                List Material
              </button>
            </div>

            <div className="card-elevated overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-3 px-4 text-sm font-medium">Material</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Quantity</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Location</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Price</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Seller</th>
                    <th className="text-left py-3 px-4 text-sm font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing) => (
                    <tr key={listing.id} className="border-b border-border last:border-b-0 hover:bg-muted/30">
                      <td className="py-3 px-4 font-medium">{listing.material}</td>
                      <td className="py-3 px-4">{listing.quantity} {listing.unit}</td>
                      <td className="py-3 px-4">{listing.location}</td>
                      <td className="py-3 px-4">Rs. {listing.price.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{listing.seller}</td>
                      <td className="py-3 px-4">
                        <button className="btn-outline text-sm px-3 py-1">Contact</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* AI Matching */}
            <div className="card-flat border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">AI Material Matching</h3>
                  <p className="text-sm text-muted-foreground">Smart recommendations for material exchange</p>
                </div>
              </div>
              <div className="p-4 bg-card border border-border">
                <p className="text-sm">
                  Based on your requirements, we found <strong>3 potential matches</strong> for recycled aluminum 
                  within 50km of your location. Contact sellers to initiate exchange.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'consumer' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Reward Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <KPICard
                title="Reward Points"
                value="2,450"
                icon={Award}
                badge="Gold Tier"
                badgeVariant="warning"
              />
              <KPICard
                title="Products Tracked"
                value={consumerProducts.length}
                icon={Package}
              />
            </div>

            <h2 className="font-semibold">Product Sustainability Scores</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {consumerProducts.map((product) => (
                <div key={product.id} className="card-elevated">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="text-right">
                      <span className="text-2xl font-semibold text-primary">{product.sustainabilityScore}</span>
                      <span className="text-sm text-muted-foreground">/100</span>
                    </div>
                  </div>
                  
                  <ProgressBar 
                    value={product.sustainabilityScore} 
                    variant={product.sustainabilityScore >= 70 ? 'success' : product.sustainabilityScore >= 40 ? 'warning' : 'danger'}
                    className="mb-4"
                  />

                  {/* Eco Alternatives */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium">Eco-friendly Alternatives</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.alternatives.map((alt, i) => (
                        <span key={i} className="text-xs bg-success/10 text-success px-2 py-1">{alt}</span>
                      ))}
                    </div>
                  </div>

                  {/* Repair Suggestions */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench className="w-4 h-4 text-info" />
                      <span className="text-sm font-medium">Repair & Reuse Options</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {product.repairSuggestions.map((suggestion, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default CircularEconomyPage;
