'use client'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

const ComponentWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ delay: 0.1 }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default ComponentWrapper