import logging

logger = logging.getLogger(__name__)

# Lazy loading of summarizer to save memory if not needed immediately
_tokenizer = None
_model = None

def get_summarizer():
    global _tokenizer, _model
    if _model is None:
        try:
            from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
            # Using an ultra-lightweight AI transformer model (Falconsai) 
            # to ensure extremely fast processing on standard CPUs.
            logger.info("Initializing Hugging Face lightweight AI Summarization model...")
            model_name = "Falconsai/text_summarization"
            _tokenizer = AutoTokenizer.from_pretrained(model_name)
            _model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
            logger.info("AI Model initialized successfully.")
        except Exception as e:
            logger.error(f"Failed to load AI summarizer: {str(e)}")
            raise e
    return _tokenizer, _model

class SummarizerService:
    @staticmethod
    def summarize(text):
        """
        Summarizes the text using HF Transformers manually, optimized for speed.
        """
        if len(text.split()) < 30:
            return text  # No need to summarize very short text
            
        try:
            tokenizer, model = get_summarizer()
            
            # Tokenize input
            inputs = tokenizer(text, return_tensors="pt", max_length=512, truncation=True)
            
            # Calculate constraints based on word count
            word_count = len(text.split())
            max_len = min(130, int(word_count * 0.6))
            min_len = min(30, int(word_count * 0.2))
            
            # Generate summary quickly (num_beams=1 is Greedy Search which is 4x faster on CPU)
            summary_ids = model.generate(
                inputs["input_ids"], 
                max_length=max_len, 
                min_length=min_len, 
                num_beams=1,
                do_sample=False,
                early_stopping=True
            )
            
            # Decode output
            summary_text = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
            return summary_text.strip()
            
        except Exception as e:
            logger.error(f"Summarization error: {str(e)}")
            return "Summarization failed due to an internal error."
