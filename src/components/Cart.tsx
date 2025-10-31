import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Minus, Plus, Sparkles } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = async () => {
    // Nous implémenterons le checkout Stripe ici
    console.log('Checkout:', items);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative group border-2 border-daruma-gold/30 hover:border-daruma-gold hover:bg-daruma-gold/10">
          <ShoppingCart className="h-5 w-5 text-daruma-gold group-hover:scale-110 transition-transform" />
          {itemCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-daruma-red text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg"
            >
              {itemCount}
            </motion.span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-daruma-paper border-l-4 border-daruma-gold">
        <SheetHeader>
          <SheetTitle className="font-japanese text-3xl text-daruma-ink flex items-center gap-2">
            <ShoppingCart className="text-daruma-gold" />
            Votre Panier
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 flex flex-col h-[calc(100vh-200px)]">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
              >
                <ShoppingCart className="w-24 h-24 text-muted-foreground/30 mb-4" />
              </motion.div>
              <p className="text-muted-foreground font-japanese">Votre panier est vide</p>
              <p className="text-sm text-muted-foreground mt-2">Ajoutez des Daruma pour commencer</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white rounded-lg p-4 shadow-md border border-daruma-gold/20"
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-daruma-paper">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-japanese font-semibold text-daruma-ink">{item.name}</h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                              className="h-8 w-8 text-muted-foreground hover:text-daruma-red"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-daruma-gold font-bold mt-1">{item.price}€</p>
                          <div className="flex items-center gap-2 mt-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 border-daruma-gold/30"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 border-daruma-gold/30"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="border-t pt-4 mt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-japanese">
                  <span className="text-daruma-ink">Total</span>
                  <span className="text-daruma-gold font-bold text-2xl">{total.toFixed(2)}€</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-daruma-red to-daruma-red/80 hover:from-daruma-red/90 hover:to-daruma-red/70 text-white font-japanese text-lg py-6 shadow-lg hover:shadow-xl transition-all group"
                >
                  <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Commander maintenant
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
